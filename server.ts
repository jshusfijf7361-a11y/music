import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// File path for persisting updated admin credentials securely on the server
const DATA_DIR = path.join(process.cwd(), ".data");
const AUTH_FILE = path.join(DATA_DIR, "cypher-auth.json");

interface AdminAccount {
  username: string;
  salt: string;
  hash: string;
  updatedAt: string;
}

interface Session {
  token: string;
  username: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory active session store (2 hours expiry)
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000;
const activeSessions = new Map<string, Session>();

function hashPassword(password: string, saltHex?: string): { hash: string; salt: string } {
  const salt = saltHex || crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const calculatedHash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(calculatedHash, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}

function initializeAdminAccount(): AdminAccount {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(AUTH_FILE)) {
      const data = JSON.parse(fs.readFileSync(AUTH_FILE, "utf-8"));
      if (data && data.username && data.hash && data.salt) {
        if (data.username === "cypher") {
          data.username = "cipher";
          fs.writeFileSync(AUTH_FILE, JSON.stringify(data, null, 2), "utf-8");
        }
        return data;
      }
    }
  } catch (err) {
    console.error("Error reading cypher auth file:", err);
  }

  // Default credentials: Username: cipher, Password: Cipher
  const { hash, salt } = hashPassword("Cipher");
  const defaultAccount: AdminAccount = {
    username: "cipher",
    salt,
    hash,
    updatedAt: new Date().toISOString(),
  };

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(AUTH_FILE, JSON.stringify(defaultAccount, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving initial cypher auth file:", err);
  }

  return defaultAccount;
}

let currentAdminAccount: AdminAccount = initializeAdminAccount();

function saveAdminAccount(account: AdminAccount) {
  currentAdminAccount = account;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(AUTH_FILE, JSON.stringify(account, null, 2), "utf-8");
  } catch (err) {
    console.error("Error persisting cypher admin credentials:", err);
  }
}

function getSessionFromRequest(req: express.Request): Session | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.substring(7).trim();
  if (!token) return null;

  const session = activeSessions.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }

  return session;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "The Global Talents Foundation" });
  });

  // CYPHER ADMIN: Authentication Login Endpoint
  app.post("/api/cypher/login", (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password || typeof username !== "string" || typeof password !== "string") {
        return res.status(401).json({ error: "Invalid login credentials." });
      }

      const inputUser = username.trim().toLowerCase();
      const storedUser = currentAdminAccount.username.toLowerCase();

      const isUsernameMatch = inputUser === storedUser || (storedUser === "cipher" && inputUser === "cypher");

      if (!isUsernameMatch) {
        return res.status(401).json({ error: "Invalid login credentials." });
      }

      const isValidPassword = verifyPassword(password, currentAdminAccount.hash, currentAdminAccount.salt);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid login credentials." });
      }

      // Generate a secure crypto session token
      const sessionToken = crypto.randomBytes(32).toString("hex");
      const session: Session = {
        token: sessionToken,
        username: currentAdminAccount.username,
        createdAt: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION_MS,
      };

      activeSessions.set(sessionToken, session);

      return res.json({
        success: true,
        sessionToken,
        username: currentAdminAccount.username,
      });
    } catch (error) {
      console.error("Cypher login error:", error);
      return res.status(500).json({ error: "Internal authentication error." });
    }
  });

  // CYPHER ADMIN: Check Current Session Validity
  app.get("/api/cypher/session", (req, res) => {
    const session = getSessionFromRequest(req);
    if (!session) {
      return res.status(401).json({ authenticated: false });
    }
    return res.json({
      authenticated: true,
      username: session.username,
    });
  });

  // CYPHER ADMIN: Invalidate / Logout Session
  app.post("/api/cypher/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      activeSessions.delete(token);
    }
    return res.json({ success: true });
  });

  // CYPHER ADMIN: Change Credentials (Requires active session & current password verification)
  app.post("/api/cypher/change-credentials", (req, res) => {
    try {
      const session = getSessionFromRequest(req);
      if (!session) {
        return res.status(401).json({ error: "Unauthorized. Active session required." });
      }

      const { currentPassword, newUsername, newPassword, confirmNewPassword } = req.body;

      if (!currentPassword || !newUsername || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: "All credential fields are required." });
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
      }

      if (newPassword.length < 4) {
        return res.status(400).json({ error: "New password must be at least 4 characters." });
      }

      const trimmedNewUser = String(newUsername).trim();
      if (!trimmedNewUser) {
        return res.status(400).json({ error: "New username cannot be empty." });
      }

      // Verify current password against stored hash server-side
      const isCurrentValid = verifyPassword(currentPassword, currentAdminAccount.hash, currentAdminAccount.salt);
      if (!isCurrentValid) {
        return res.status(401).json({ error: "Invalid current password." });
      }

      // Hash the new password with a fresh random salt
      const { hash: newHash, salt: newSalt } = hashPassword(newPassword);

      const updatedAccount: AdminAccount = {
        username: trimmedNewUser,
        salt: newSalt,
        hash: newHash,
        updatedAt: new Date().toISOString(),
      };

      saveAdminAccount(updatedAccount);

      // Invalidate ALL existing admin sessions so re-login is required immediately
      activeSessions.clear();

      return res.json({
        success: true,
        message: "Administrator credentials updated successfully. Please log in again with your new credentials.",
      });
    } catch (error) {
      console.error("Cypher change credentials error:", error);
      return res.status(500).json({ error: "Internal error updating credentials." });
    }
  });

  // AI Music & Career Mentor Endpoint using Gemini
  app.post("/api/ai-mentor", async (req, res) => {
    try {
      const { prompt, topic, language } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Return a helpful simulated expert AI response if key is not configured
        return res.json({
          response: `[Aura Music Mentor - ${topic || 'General Guidance'}]: Music is a universal language that transcends boundaries. Focus on daily intentional practice, master harmonic intervals, and keep your creative vision authentic. How can I guide your specific song or production today?`,
          fallback: true
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are Aura AI, a elite music education mentor and creative director for Aura Global Music Foundation. Provide highly encouraging, expert advice on music theory, vocals, production, sound engineering, artist branding, or music business. Keep answers concise, clear, inspiring, and formatted nicely. Respond in the requested language: ${language || 'English'}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ response: response.text || "Keep honing your craft with passion and patience." });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: "Failed to query AI Music Mentor", 
        details: error?.message || "Unknown error"
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

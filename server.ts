import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Aura Global Music Foundation" });
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

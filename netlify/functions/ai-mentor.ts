import { GoogleGenAI } from "@google/genai";

export async function handler(event: any) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { prompt, topic, language } = body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          response: `[Global Talents Mentor - ${topic || 'General Guidance'}]: Music is a universal language that transcends boundaries. Focus on daily intentional practice, master harmonic intervals, and keep your creative vision authentic. How can I guide your specific song or production today?`,
          fallback: true
        }),
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `You are Global Talents AI, an elite music education mentor and creative director for The Global Talents Foundation. Provide highly encouraging, expert advice on music theory, vocals, production, sound engineering, artist branding, or music business. Keep answers concise, clear, inspiring, and formatted nicely. Respond in the requested language: ${language || 'English'}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response: response.text || "Keep honing your craft with passion and patience." }),
    };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to query AI Music Mentor",
        details: error?.message || "Unknown error"
      }),
    };
  }
}

import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: 'nodejs20.x'
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
    return;
  }

  const { survivors, avgSanity } = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

  const ai = new GoogleGenAI({ apiKey });

  try {
    const prompt = `
      You are a cryptic AI interface for a cyberpunk horror survival game called "Crimson Soil".
      The world is ending. There are only ${survivors} survivors left out of 10,000. 
      The average sanity of survivors is ${avgSanity}%.
      
      Generate a short, atmospheric system log (max 30 words) describing a new threat, a weather anomaly in "Black Sea City", or a cryptic philosophical warning about the simulation.
      Style: Dark, Industrial, Glitchy.
      Language: Chinese.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    res.status(200).json({ text: response.text || "系统错误：数据流中断..." });
  } catch (error) {
    console.error('Gemini Gen Error:', error);
    res.status(500).json({ error: 'Gemini Gen Error' });
  }
}

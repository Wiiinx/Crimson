import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateWorldEvent = async (survivors: number, avgSanity: number): Promise<string> => {
  if (!ai) return "终端离线：无法连接至预言模块。请检查 API 密钥配置。";

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

    return response.text || "系统错误：数据流中断...";
  } catch (error) {
    console.error("Gemini Gen Error:", error);
    return "系统错误：外部信号干扰严重...";
  }
};
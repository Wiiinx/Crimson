export const generateWorldEvent = async (survivors: number, avgSanity: number): Promise<string> => {
  try {
    const response = await fetch('/api/generate-world-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ survivors, avgSanity })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return "系统错误：外部信号干扰严重...";
    }

    const data = await response.json();
    return data.text || "系统错误：数据流中断...";
  } catch (error) {
    console.error("Gemini Gen Error:", error);
    return "系统错误：外部信号干扰严重...";
  }
};
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the client. 
// Note: In a real production build, ensure process.env.API_KEY is replaced during build or provided securely.
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEventDescription = async (eventName: string, keywords: string[]): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Create a catchy and exciting description for an event named "${eventName}". 
    Use the following keywords: ${keywords.join(', ')}. 
    The tone should be inviting and professional. Limit to 100 words.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content.";
  }
};

export const suggestGiftList = async (eventType: string): Promise<Array<{item: string, priceEstimate: string}>> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Suggest a list of 5 popular gift items for a "${eventType}". Return a JSON list.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              item: { type: Type.STRING },
              priceEstimate: { type: Type.STRING, description: "Estimated price in BRL format" }
            }
          }
        }
      }
    });

    const jsonText = response.text || "[]";
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini API JSON Error:", error);
    return [];
  }
};
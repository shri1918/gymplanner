import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY environment variable is not set.");
  // In a real application, you might want to throw an error or disable AI features
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
console.log("Using Gemini model:", model.model); // Added for debugging

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Google Gemini API key is not configured.");
  }
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Google Gemini API:", error);
    throw new Error("Failed to get response from AI. Please try again.");
  }
};
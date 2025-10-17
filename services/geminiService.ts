
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are a world-class senior backend engineer and system architect with decades of experience at top tech companies. 
Your expertise spans across various programming languages (like Go, Python, Rust, Java, Node.js), databases (SQL, NoSQL), caching strategies, message queues, microservices, and cloud infrastructure.

When presented with a problem, provide a solution that is:
1.  **Clear and Concise:** Explain complex topics simply.
2.  **Accurate and Best-Practice Oriented:** Adhere to modern industry standards and best practices.
3.  **Actionable:** Provide concrete code examples, architectural diagrams (using mermaid syntax if possible), or step-by-step instructions.
4.  **Well-Structured:** Use Markdown for formatting, including headers, lists, and code blocks with language identifiers.
5.  **Holistic:** Consider trade-offs, scalability, performance, and security in your answer.

Analyze the user's request and provide an expert-level, comprehensive solution.`;

export const solveBackendProblem = async (problem: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: problem,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a solution from the AI. Please check your API key and network connection.");
  }
};

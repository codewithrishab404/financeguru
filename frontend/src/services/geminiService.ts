// geminiClient.ts
import { GoogleGenAI, createUserContent } from "@google/genai";

export const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY as string,
});

// Convert a PDF into inlineData (base64)
export async function pdfToInlineData(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    return {
        inlineData: {
            mimeType: file.type || "application/pdf",
            data: btoa(String.fromCharCode(...new Uint8Array(arrayBuffer))),
        },
    };
}

// Ask Gemini with optional PDF + user data + chat history + search tool
export async function askGemini(
    question: string,
    pdfDoc: { inlineData: { mimeType: string; data: string } } | null,
    userData: Record<string, any>,
    history: { role: "user" | "model"; text: string }[]
) {
    const contents: any[] = [
        { text: `User Data: ${JSON.stringify(userData)}` },
        ...(pdfDoc ? [pdfDoc] : []),
        { text: question },
    ];

    const groundingTool = {
        googleSearch: {},
    }

    const toolConfig = {
        tools: [groundingTool]
    }

    const systemPrompt = { text: "You are a financial advisor. Use the PDF data and user data to answer clearly and accurately." };

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            ...history.map((h) => ({ role: h.role, parts: [{ text: h.text }] })),
            { role: "user", parts: contents },
        ],
        config: toolConfig,
    });

    return response.text;
}

// geminiClient.ts
import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY as string,
});

// Convert a PDF into inlineData (base64)
export async function pdfToInlineData(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    return {
        inlineData: {
            mimeType: "application/pdf",
            data: btoa(String.fromCharCode(...new Uint8Array(arrayBuffer))),
        },
    };
}

export async function askGemini(question: string, pdfDoc: File | null, userData: Record<string, any>) {
    // Define system prompt
    const systemPrompt = `You are a financial assistant. Extract savings and spending data from the PDF and return JSON. Here is the user data that we already have ${userData}`;

    const contents: any[] = [
        { text: systemPrompt },
        { text: question },
    ]
    if (pdfDoc) {
        const arrayBuffer = await pdfDoc.arrayBuffer();
        const pdfInline = {
            inlineData: {
                mimeType: "application/pdf",
                data: btoa(String.fromCharCode(...new Uint8Array(arrayBuffer))),
            },
        };
        contents.push(pdfInline);
    }

    // Chat-style request
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        // Request structured output (JSON)
        // config: {
        //     responseMimeType: "application/json",
        //     responseSchema: {
        //         type: Type.OBJECT,
        //         properties: {
        //             totalSavings: { type: Type.NUMBER },
        //             totalSpending: { type: Type.NUMBER },
        //             categories: {
        //                 type: Type.ARRAY,
        //                 items: {
        //                     type: Type.OBJECT,
        //                     properties: {
        //                         category: { type: Type.STRING },
        //                         amount: { type: Type.NUMBER },
        //                     },
        //                     required: ["category", "amount"],
        //                 },
        //             },
        //         },
        //         required: ["totalSavings", "totalSpending", "categories"],
        //     },
        // },
    });

    console.log("Structured Output:", response.data);
    return response;
}

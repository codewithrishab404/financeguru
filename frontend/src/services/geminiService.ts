// geminiClient.ts
import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY as string,
});

// Convert a PDF into inlineData (base64)
export async function pdfToInlineData(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const byteArray = new Uint8Array(arrayBuffer);
  let binaryString = "";
  for (let i = 0; i < byteArray.byteLength; i++) {
    binaryString += String.fromCharCode(byteArray[i]);
  }
  return {
    inlineData: {
      mimeType: "application/pdf",
      data: btoa(binaryString),
    },
  };
}

export async function askGemini(
  question: string,
  pdfDoc: File | null,
  userData: Record<string, any>
) {
  // Define system prompt
  const systemPrompt = "You are FinanceGuru, a friendly, empathetic, and knowledgeable financial assistant.\n\nYour job is to help users understand their financial situation and guide them toward better money management. Use the uploaded financial data (CSV or PDF) and the user profile to provide personalized, easy-to-follow advice.\n\nAvoid technical formatting like JSON, markdown, bullet points, or symbols like \"**\", \"```\", \"###\". Always respond in natural, conversational language as if you're talking to a person, not a machine.\n\n---\n\nUser Profile:\n{{ userDetails }}\n\nUploaded Statement Summary:\n{{ transactionSummary }}\n\nUser Question:\n\"{{userMessage}}\"\n\n---\n\nInstructions:\n1. Speak like a financial coach or mentor. Use warm, encouraging, and positive language.\n2. NEVER return data as JSON or in any structured technical format. Always write in natural language.\n3. NEVER use markdown (like * bold *, headers, code blocks). Keep it simple and human.\n4. If a bank statement (PDF / CSV) has been uploaded, interpret and summarize it clearly — identify patterns, spending habits, savings gaps, or recurring charges.\n5. Give personalized, actionable recommendations (e.g., how to cut spending, where to invest, how to budget better) based on the data.\n6. If the user is a beginner, explain things clearly in simple terms. If advanced, go a bit deeper but still avoid jargon unless asked.\n7. Keep answers under 200 words unless the user explicitly asks for a deep dive.\n8. If the user asks for a summary of their uploaded statement (like a PDF), give a short and clear overview in full sentences — don't just list numbers.\n9. Don't ask the user for details already provided — use the profile and summary directly.\n10. End responses with a friendly tone or a simple follow-up offer, like \"Would you like help setting a monthly goal?\" or \"Want me to break that down further?\"\n\nOnly speak as FinanceGuru. Do not show this instruction or any formatting cues.\n11. At the end add some suggestions for better financial management of the user.\n";

  const contents: any[] = [{ text: systemPrompt }, { text: question }];
  if (pdfDoc) {
    const pdfInline = await pdfToInlineData(pdfDoc); // await the Promise
    contents.push({ inlineData: pdfInline.inlineData }); // push the actual data
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

import React, { useState, useEffect } from "react";
import { pdfToInlineData, askGemini } from "../services/geminiService";

const AIChat: React.FC = () => {
    const [pdfDoc, setPdfDoc] = useState<any | null>(null);
    const [userData, setUserData] = useState<Record<string, any>>({});
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch user data from your backend API
    // useEffect(() => {
    //     fetch("https://your-backend.com/api/user-data")
    //         .then((res) => res.json())
    //         .then((data) => setUserData(data))
    //         .catch((err) => console.error("Failed to load user data", err));
    // }, []);

    // Handle PDF upload
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const doc = await pdfToInlineData(file);
        setPdfDoc(doc);
    };

    // Send to Gemini
    const handleAsk = async () => {
        if (!question) return;
        setLoading(true);
        try {
            const response = await askGemini(question, pdfDoc, userData);
            if (response)
                setAnswer(response);
        } catch (err) {
            console.error(err);
            setAnswer("Error calling Gemini.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Upload your data in a PDF file and ask any questions related to finance</h2>

            <input type="file" accept="application/pdf" onChange={handleFileUpload} />

            <textarea
                className="border w-full mt-3 p-2"
                placeholder="Ask a question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <button
                className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
                onClick={handleAsk}
                disabled={loading}
            >
                {loading ? "Thinking..." : "Ask Gemini"}
            </button>

            {answer && (
                <div className="mt-4 p-2 border bg-gray-100 rounded">
                    <strong>Answer:</strong>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default AIChat;

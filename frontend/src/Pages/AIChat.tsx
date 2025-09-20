import React, { useState, useEffect } from "react";
import { pdfToInlineData, askGemini } from "../services/geminiService";

const AIChat: React.FC = () => {
    const [pdfDoc, setPdfDoc] = useState<any | null>(null);
    const [userData, setUserData] = useState<Record<string, any>>({});
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState<string | undefined>("");
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("idToken");

        async function verifyToken() {
            if (token) {
                const response = await fetch('http://localhost:5000/protected', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                });
                const data = await response.json();
                if (data.valid) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        }

        async function getUserData() {
            try {
                const res = await fetch("http//localhost:5000/user-data", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    redirect: "follow"
                });
                const data = await res.json();
                setUserData(data);
            } catch (err) {
                console.log("Failed to get user data");
            }
        }

        verifyToken();
        getUserData();
    }, [])

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
            let response;
            if (pdfDoc)
                response = await askGemini(question, pdfDoc, userData);
            else
                response = await askGemini(question, null, userData);
            if (response)
                setAnswer(response.text);
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

import React, { useState, useEffect } from "react";
import { pdfToInlineData, askGemini } from "../services/geminiService";

const AIChat: React.FC = () => {
    const [pdfDoc, setPdfDoc] = useState<any | null>(null);
    const [userData, setUserData] = useState<Record<string, any>>({});
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState<string | undefined>("");
    const [loading, setLoading] = useState(false);

    // Fetch user data
    useEffect(() => {
        fetch("http//localhost:5000/user-data", {
            method: "GET",
            headers: {
                "Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwMDZlMjc5MTVhMTcwYWIyNmIxZWUzYjgxZDExNjU0MmYxMjRmMjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmluYW5jZWd1cnUtM2M0NjIiLCJhdWQiOiJmaW5hbmNlZ3VydS0zYzQ2MiIsImF1dGhfdGltZSI6MTc1ODM2MjYxMywidXNlcl9pZCI6ImlLcmRZTGRzclpnMW5veXpnME5WSTIwelZuejEiLCJzdWIiOiJpS3JkWUxkc3JaZzFub3l6ZzBOVkkyMHpWbnoxIiwiaWF0IjoxNzU4MzYyNjEzLCJleHAiOjE3NTgzNjYyMTMsImVtYWlsIjoiYXJwYW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFycGFuQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.TN2DC2d7oPSV30gIG5ZVVcKb0okf9YnrZ547vxS17BJhvii0Y7CDGLwlCrY5ZO6mhHasFvAJLGJoKqSzfhBxpz_6fmqMHJU42B7q9Q_RDFMHIwVOMi3QGyh39EfxxeQH3mJVRWIY-Ez1cKaHV9JSHROpQt9Gav22rQ6LvTK7OyNXODSn5nyOLBADG-yZOq9_FPDhLBPMNp9u9zDA7IqH8qPtmYwjOV0oBYf1-Do6_RPHpIrFxRZAEu4amRuXirQlacD6AZ53S6cMq_7I3gVtw5iXY_LRD51uKsEDDic_coF45Q8bndNGBovLne9CoU95mdRFAxZX-98J06iRUtEeEQ"
            },
            redirect: "follow"
        })
            .then((res) => res.json())
            .then((data) => setUserData(data))
            .catch((err) => console.error("Failed to load user data", err));
    }, []);

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

// AIChat.tsx
import React, { useState, useEffect } from "react";
import { askGemini } from "../services/geminiService";
import Background from "../Component/Background";
import Navbar from "../Component/NavBar";

const AIChat: React.FC = () => {
  const [pdfDoc, setPdfDoc] = useState<File | null>(null); // Change type to File | null
  const [userData, setUserData] = useState<Record<string, any>>({});
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);

  // Fetch user data
  useEffect(() => {
    fetch("http://localhost:5000/user-data", {
      method: "GET",
      headers: {
        Authorization:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwMDZlMjc5MTVhMTcwYWIyNmIxZWUzYjgxZDExNjU0MmYxMjRmMjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmluYW5jZWd1cnUtM2M0NjIiLCJhdWQiOiJmaW5hbmNlZ3VydS0zYzQ2MiIsImF1dGhfdGltZSI6MTc1ODM2MjYxMywidXNlcl9pZCI6ImlLcmRZTGRzclpnMW5veXpnME5WSTIwelZuejEiLCJzdWIiOiJpS3JkWUxkc3JaZzFub3l6ZzBOVkkyMHpWbnoxIiwiaWF0IjoxNzU4MzYyNjEzLCJleHAiOjE3NTgzNjYyMTMsImVtYWlsIjoiYXJwYW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFycGFuQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.TN2DC2d7oPSV30gIG5ZVVcKb0okf9YnrZ547vxS17BJhvii0Y7CDGLwlCrY5ZO6mhHasFvAJLGJoKqSzfhBxpz_6fmqMHJU42B7q9Q_RDFMHIwVOMi3QGyh39EfxxeQH3mJVRWIY-Ez1cKaHV9JSHROpQt9Gav22rQ6LvTK7OyNXODSn5nyOLBADG-yZOq9_FPDhLBPMNp9u9zDA7IqH8qPtmYwjOV0oBYf1-Do6_RPHpIrFxRZAEu4amRuXirFq-C5Q8bndNGBovLne9CoU95mdRFAxZX-98J06iRUtEeEQ",
      },
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error("Failed to load user data", err));
  }, []);

  // Handle PDF upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfDoc(file); // Set the state with the original File object
  };

  // Send to Gemini
  const handleAsk = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const response = await askGemini(question, pdfDoc, userData); // Pass the File object
      if (response) setAnswer(response.text);
    } catch (err) {
      console.error(err);
      setAnswer("Error calling Gemini.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar /> {/* Add the Navbar component here */}
      <Background />
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 p-4 backdrop-blur-sm">
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 flex flex-col gap-4">
          {/* Header */}
          <h2 className="text-2xl font-bold text-white text-center">
            Finance AI Guruji
          </h2>
          <p className="text-white/70 text-center">
            Ask any finance question or upload a PDF for personalized guidance
          </p>

          {/* Chat Area */}
          <div className="flex flex-col gap-4 w-full">
            {/* Textarea */}
            <textarea
              className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Ask Guruji..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
            />

            {/* Upload PDF */}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="w-full text-white/70 file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none"
            />

            {/* Options & Ask Button */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <button className="bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition">
                  More Options
                </button>
                {pdfDoc && (
                  <span className="text-white/70 px-2 py-1 rounded-lg bg-white/10 text-sm">
                    PDF Selected
                  </span>
                )}
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition shadow-lg"
                onClick={handleAsk}
                disabled={loading}
              >
                {loading ? "Thinking..." : "Ask Guruji"}
              </button>
            </div>
          </div>

          {/* Answer Box */}
          {answer && (
            <div className="mt-4 p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white max-h-96 overflow-y-auto">
              <strong>Answer:</strong>
              <p className="mt-2 whitespace-pre-line">{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIChat;

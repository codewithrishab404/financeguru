// AIChat.tsx
import React, { useState, useEffect } from "react";
import { askGemini } from "../services/geminiService";
import Background from "../Component/Background";
import Navbar from "../Component/NavBar";

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
        const res = await fetch("http://localhost:5000/user-data", {
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

import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Component/NavBar";
import Background from "./Component/Background";

export default function App() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    // Simulate AI response (replace this with your finance AI API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "This is a dummy Finance AI response. Replace with real AI logic.",
        },
      ]);
    }, 500);
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Background />
      <Navbar />

      <main className="relative z-10 flex flex-col h-full max-w-3xl mx-auto pt-24 px-4">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`my-2 p-3 rounded-lg max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-white/20 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your Finance AI..."
            className="flex-1 p-3 rounded-l-lg bg-white/20 text-white placeholder-white/70 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-r-lg transition"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
}

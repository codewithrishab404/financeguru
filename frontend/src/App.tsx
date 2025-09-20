import React, { useState } from "react";
import Navbar from "./Component/NavBar";
import Background from "./Component/Background";

export default function App() {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("User asked:", input); // later hook your Finance AI here
    setInput("");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Background />
      <Navbar />

      {/* Centered Input Bar */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="w-full max-w-2xl px-4">
          <div className="flex backdrop-blur-md bg-white/20 rounded-full overflow-hidden shadow-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your Finance AI..."
              className="flex-1 px-6 py-4 text-white placeholder-white/70 bg-transparent focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-r-full transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

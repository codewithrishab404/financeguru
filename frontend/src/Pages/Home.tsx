import React, { useState } from "react";
import Navbar from "../Component/NavBar";
import Background from "../Component/Background";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("User asked:", input); // hook with Finance AI here
    setInput("");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Background />
      <Navbar />

      {/* Floating Button at Top-Left */}
      {!showChat && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -8, 0],
            boxShadow: [
              "0 0 15px rgba(59,130,246,0.4)",
              "0 0 30px rgba(59,130,246,0.6)",
              "0 0 15px rgba(59,130,246,0.4)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          onClick={() => setShowChat(true)}
          className="absolute top-20 left-6 px-6 py-3 text-lg font-semibold text-white rounded-2xl
                     bg-white/20 backdrop-blur-xl border border-white/30
                     shadow-lg hover:shadow-2xl hover:bg-white/30 transition z-20"
        >
          Start your Finance Chat with Guruji
        </motion.button>
      )}

      {/* Left-Side Paragraph with Cool Effects */}
      {!showChat && (
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-40 left-6 max-w-[50%] text-white leading-relaxed"
        >
          {/* Gradient Animated Heading */}
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-text-shimmer">
            ChatGuru – Smart, Personalized Financial Guidance for Everyone
          </h2>

          {/* Paragraph with fade-in effect line by line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-lg"
          >
            Financial literacy is a global challenge, and one-size-fits-all
            advice often misses the mark. ChatGuru changes that. It delivers
            personalized guidance on{" "}
            <span className="font-semibold">
              savings, taxes, and investments
            </span>
            , while adapting its tone and complexity to match each user’s
            background and needs. Plus, it generates simple, easy-to-read budget
            summaries and spending insights—making financial knowledge
            accessible, relatable, and actionable for everyone.
          </motion.p>
        </motion.div>
      )}

      {/* Chat Input (Center when chat starts) */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-2xl px-4"
            >
              <motion.div
                initial={{ boxShadow: "0 0 0px rgba(59,130,246,0)" }}
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(59,130,246,0.3)",
                    "0 0 30px rgba(59,130,246,0.6)",
                    "0 0 15px rgba(59,130,246,0.3)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
                className="flex backdrop-blur-xl bg-white/20 rounded-full overflow-hidden border border-white/30"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your Finance AI Guruji..."
                  className="flex-1 px-6 py-4 text-white placeholder-white/70 bg-transparent focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-r-full transition"
                >
                  Send
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tailwind CSS: Gradient text animation */}
      <style>
        {`
          @keyframes text-shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-text-shimmer {
            background-size: 200% 200%;
            animation: text-shimmer 4s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

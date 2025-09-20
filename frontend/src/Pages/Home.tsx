import React, { useState, useEffect } from "react";
import Navbar from "../Component/NavBar";
import Background from "../Component/Background";
import { motion, AnimatePresence } from "framer-motion";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import CountUp from "react-countup";
import AIChat from "./AIChat"; // <-- import your chatbot

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("User asked:", input);
    setInput("");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden share-tech-mono-regular">
      <Background />
      <Navbar />

      {/* Fonts Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Victor+Mono:ital,wght@0,100..700;1,100..700&display=swap');

          .victor-mono {
            font-family: "Victor Mono", monospace;
          }

          .share-tech-mono-regular {
            font-family: "Share Tech Mono", monospace;
            font-weight: 400;
          }

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

      {/* Mirage loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/40">
          <Mirage size="126" speed="1.6" color="white" />
        </div>
      )}

      {!loading && (
        <>
          {/* Floating Button */}
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
                         shadow-lg hover:shadow-2xl hover:bg-white/30 transition z-20 victor-mono"
            >
              Start your Finance Chat with Guruji
            </motion.button>
          )}

          {/* Left-Side Paragraph */}
          {!showChat && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-40 left-6 max-w-[50%] text-white leading-relaxed share-tech-mono-regular"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-text-shimmer victor-mono">
                ChatGuru – Smart, Personalized Financial Guidance for Everyone
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="text-2xl"
              >
                Financial literacy is a global challenge, and one-size-fits-all
                advice often misses the mark. ChatGuru delivers personalized
                guidance on{" "}
                <span className="font-semibold">
                  savings, taxes, and investments
                </span>
                , adapting its tone to match each user’s background and needs.
              </motion.p>
            </motion.div>
          )}

          {/* Info Boxes Below Text */}
          {!showChat && (
            <div className="absolute top-[550px] left-6 flex gap-6 z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative w-64 h-32 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl flex flex-col items-center justify-center text-white text-2xl font-bold overflow-hidden share-tech-mono-regular"
              >
                <CountUp
                  end={4800000}
                  duration={2.5}
                  separator=","
                  suffix=" Users"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-blue-400 opacity-30 blur-3xl"
                  animate={{
                    x: ["-50%", "50%", "-50%"],
                    y: ["-50%", "50%", "-50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-64 h-32 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl flex flex-col items-center justify-center text-white text-2xl font-bold overflow-hidden share-tech-mono-regular"
              >
                <CountUp
                  end={4.8}
                  duration={2.5}
                  decimals={1}
                  suffix=" Rating"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-blue-400 opacity-30 blur-3xl"
                  animate={{
                    x: ["50%", "-50%", "50%"],
                    y: ["50%", "-50%", "50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              </motion.div>
            </div>
          )}

          {/* Chat Input */}
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
                      className="flex-1 px-6 py-4 text-white placeholder-white/70 bg-transparent focus:outline-none share-tech-mono-regular"
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button
                      onClick={handleSend}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-r-full transition victor-mono"
                    >
                      Send
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Floating AI Chatbot */}
          <div className="fixed bottom-6 right-6 z-50">
            <AIChat />
          </div>
        </>
      )}
    </div>
  );
}

import React, { useState } from "react";
import Navbar from "./Component/NavBar";
import Background from "./Component/Background";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
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

      {/* If chat started → Show Input Bar at Center */}
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
    </div>
  );
}

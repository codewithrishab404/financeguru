import React, { useState, useEffect } from "react";
import Navbar from "../Component/NavBar";
import Background from "../Component/Background";
import { motion } from "framer-motion";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  const navigate = useNavigate(); // <-- initialize navigate here

  const handleClick = () => {
    navigate("/chat");
    console.log("Finance Chat button clicked!");
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
          {/* Left-Side Paragraph */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-20 left-6 max-w-[50%] text-white leading-relaxed share-tech-mono-regular"
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

          {/* Centered Button Below Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute top-[50%] left-1/2 -translate-x-1/2 z-20"
          >
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
              onClick={handleClick}
              className="px-8 py-4 text-lg font-semibold text-white rounded-2xl
                         bg-white/20 backdrop-blur-xl border border-white/30
                         shadow-lg hover:shadow-2xl hover:bg-white/30 transition victor-mono"
            >
              Start your Finance Chat with Guruji
            </motion.button>
          </motion.div>

          {/* Info Boxes Below Text */}
          <div className="absolute top-[550px] left-6 flex gap-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative w-64 h-32 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl flex flex-col items-center justify-center text-white text-2xl font-bold overflow-hidden share-tech-mono-regular"
            >
              <CountUp
                end={480000}
                duration={4.0}
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
              <CountUp end={4.8} duration={2.5} decimals={1} suffix=" Rating" />
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
        </>
      )}
    </div>
  );
}

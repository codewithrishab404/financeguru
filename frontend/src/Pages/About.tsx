import React from "react";
import Background from "../Component/Background";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="relative w-screen h-screen overflow-auto share-tech-mono-regular">
      <Background />

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
        `}
      </style>

      <div className="absolute inset-0 flex flex-col items-center p-6 text-white">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 victor-mono">
            About ChatGuru
          </h1>
          <p className="text-xl share-tech-mono-regular text-white/80">
            ChatGuru is your personalized AI financial assistant, designed to
            make financial literacy accessible, simple, and actionable for
            everyone. We aim to guide users in savings, investments, taxes,
            budgeting, and more, with insights tailored to their lifestyle and
            goals.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 w-full justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-6 flex-1 text-center"
          >
            <h2 className="text-2xl font-bold mb-2 victor-mono">Our Mission</h2>
            <p className="share-tech-mono-regular text-white/80">
              To empower individuals with personalized financial guidance,
              helping them make informed decisions and achieve financial
              independence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-6 flex-1 text-center"
          >
            <h2 className="text-2xl font-bold mb-2 victor-mono">Our Vision</h2>
            <p className="share-tech-mono-regular text-white/80">
              To be the go-to AI financial companion that simplifies money
              management and makes financial literacy engaging for everyone.
            </p>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="w-full max-w-5xl mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center victor-mono">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Rishab", "Aritra", "Bhargav", "Arpan"].map((name, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-center"
              >
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-xl victor-mono">{name}</h3>
                <p className="share-tech-mono-regular text-white/80 mt-2">
                  Placeholder role or description goes here.
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Optional Counters Section */}
        <motion.div
          className="flex gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-6 w-40 text-center">
            <p className="text-3xl font-bold victor-mono">4.8M</p>
            <p className="share-tech-mono-regular text-white/80">Users</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-6 w-40 text-center">
            <p className="text-3xl font-bold victor-mono">4.8</p>
            <p className="share-tech-mono-regular text-white/80">Rating</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Background from "../Component/Background";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Add your authentication logic here
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden share-tech-mono-regular">
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

      <div className="flex items-center justify-center w-full h-full">
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onSubmit={handleLogin}
          className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl p-10 w-full max-w-md text-white share-tech-mono-regular"
        >
          <h2 className="text-3xl font-bold mb-6 text-center victor-mono">
            Login to Finance Guru Ji
          </h2>

          <div className="mb-4">
            <label className="block mb-2 font-semibold victor-mono">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 share-tech-mono-regular"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold victor-mono">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 share-tech-mono-regular"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition font-semibold text-white shadow-lg victor-mono"
          >
            Login
          </button>

          <p className="mt-4 text-center text-white/80 share-tech-mono-regular">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-400 hover:underline victor-mono"
            >
              Register
            </a>
          </p>
        </motion.form>
      </div>
    </div>
  );
}

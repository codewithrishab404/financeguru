import React, { useState } from "react";
import Background from "../Component/Background";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email,
      "password": password
    });

    const res = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    })
    const data = await res.json();
    if (data.uid) {
      alert("You have successfully registered. You can login now.");
      navigate("/login");
    } else {
      alert("Registration failed: Please try again!");
    }
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
          onSubmit={handleRegister}
          className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl p-10 w-full max-w-md text-white share-tech-mono-regular"
        >
          <h2 className="text-3xl font-bold mb-6 text-center victor-mono">
            Register to Finance Guru Ji
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
            Register
          </button>

          <p className="mt-4 text-center text-white/80 share-tech-mono-regular">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-400 hover:underline victor-mono"
            >
              Login
            </a>
          </p>
        </motion.form>
      </div>
    </div>
  );
}

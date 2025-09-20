import React, { useState } from "react";
import Background from "../Component/Background";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Register with", email, password);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Background />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Register
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none"
          />
          <button
            onClick={handleRegister}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
          >
            Register
          </button>
          <p className="text-white/70 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

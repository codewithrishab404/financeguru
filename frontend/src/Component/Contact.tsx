import React, { useState } from "react";
import Background from "./Background";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Layer */}
      <Background />

      {/* Contact Form */}
      <section className="absolute inset-0 flex items-center justify-center px-6 md:px-20">
        <div className="max-w-3xl w-full bg-gray-900/60 backdrop-blur-lg rounded-2xl p-10 text-white relative z-10 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Contact Us
          </h2>
          <p className="text-center text-lg mb-10">
            Have questions or suggestions? We’d love to hear from you!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-800/70 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-800/70 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-800/70 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage"; // create this component
import Home from "./Pages/Home";
import RegisterPage from "./Pages/RegisterPage";
import UserForm from "./Pages/UserForm";
import AIChat from "./Pages/AIChat";
import Contact from "./Component/Contact";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/userform" element={<UserForm />} />
      <Route path="/chat" element={<AIChat />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

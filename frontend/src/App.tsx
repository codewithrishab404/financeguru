import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage"; // create this component
import Home from "./Pages/Home";
import Contact from "./Component/Contact";
// move your current ChatGuru content here

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

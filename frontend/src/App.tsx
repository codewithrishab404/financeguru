import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage"; // create this component
import Home from "./Pages/Home";
import RegisterPage from "./Pages/RegisterPage";
import UserForm from "./Pages/UserForm";
// move your current ChatGuru content here

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/userform" element={<UserForm />} />
    </Routes>
  );
}

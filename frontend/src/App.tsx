<<<<<<< HEAD
import AIChat from './pages/AIChat'
import './App.css'

function App() {
  return (
    <>
      <div>
        <AIChat />
      </div>
    </>
  )
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage"; // create this component
import Home from "./Pages/Home";
import RegisterPage from "./Pages/RegisterPage";
import UserForm from "./Pages/UserForm";
import Contact from "./Component/Contact";
// move your current ChatGuru content here

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/userform" element={<UserForm />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
>>>>>>> b05ca118a0321e03392198513c104bb56e13ca34
}

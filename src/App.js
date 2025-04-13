import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import BudgetChecker from "./components/BudgetChecker";
import Login from "./components/Login";
import SignUp from "./components/SignUp"; // Import SignUp

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/BudgetChecker" element={<BudgetChecker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> {/* Added Sign Up Route */}
      </Routes>
    </Router>
  );
}

export default App;

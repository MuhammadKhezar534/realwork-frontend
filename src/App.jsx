import React from "react"; // 👈 Add this line
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Commission from "./pages/Commission";
import Agents from "./pages/Agents";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/commission" element={<Commission />} />
      <Route path="/agents" element={<Agents />} />
    </Routes>
  );
}

export default App;

import React from "react"; // 👈 Add this line
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Commission from "./pages/Commission";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/commission" element={<Commission />} />
    </Routes>
  );
}

export default App;

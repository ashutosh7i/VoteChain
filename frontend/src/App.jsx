import { useState } from "react";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import Hero from "./components/Hero";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page1 from "./components/Page1";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Routes>
        <Route path="/Page1" element={<Page1 />} />
        <Route path="/Page2" element={<Page2 />} />
        <Route path="/Page3" element={<Page3 />} />
      </Routes>
    </>
  );
}

export default App;

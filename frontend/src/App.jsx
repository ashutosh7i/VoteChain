import { useState } from "react";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import Hero from "./components/Hero";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

export default App;

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Explorer from "./components/Explorer";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Explorer" element={<Explorer />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

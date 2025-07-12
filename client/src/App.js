import React from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;

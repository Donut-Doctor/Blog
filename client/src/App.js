import React from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="app-content">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;

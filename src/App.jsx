import { useState } from "react";
import "./App.css";
import { Route,Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./page/Home";
import About from "./page/About";



function App() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { Route,Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./page/Home";



function App() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* <Routes>
        <Route path="/*" element={<Layout />} >
        </Route>
      </Routes> */}
      <Header />
      <Home />
    </div>
  );
}

export default App;

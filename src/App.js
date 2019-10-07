import React from "react";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Canvas></Canvas>
      <Sidebar />
    </div>
  );
}

export default App;

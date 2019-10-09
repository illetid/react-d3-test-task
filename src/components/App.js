import React from "react";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";
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

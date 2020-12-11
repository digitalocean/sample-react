import React from "react";
import logo from "./giscomltd.gif";
import "./App.css";

/**
 * Uses Tailwind CSS for styling
 * Tailwind file is imported in App.css
 */

export default function App() {
  return (
    <div className="app min-h-screen text-blue-200 flex items-center flex-col p-20">
      <div className="content">
        <img className="opacity-25" src={logo} alt="React Logo" width="300" />
      
      </div>


     
    </div>
  );
}


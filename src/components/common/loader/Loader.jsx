// Loader.jsx
import React from "react";
import "./loader.css";

export default function Loader() {
  return (
    <div className="loader-screen">
      <div className="loader-container">
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
      </div>
    </div>
  );
}

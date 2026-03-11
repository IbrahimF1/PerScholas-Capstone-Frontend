import React from "react";
import "./ShootingStarsLogo.css";

export default function ShootingStarsLogo() {
  return (
    <div className="shooting-stars-logo">
      <div className="logo-scaler">
        <div className="sky-container">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        <div className="border"></div>
      </div>
    </div>
  );
}
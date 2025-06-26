import React from "react";
import School_Img from "../../assets/School.png";
import "./HomeCover.css"; // Import the CSS file

function HomeCover() {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${School_Img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Overlay layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 9, 0, 0.7)",
            zIndex: 0,
          }}
        ></div>

        {/* Main content container for text */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          <h1
            style={{
              color: "Orange",
              textShadow: "1px 1px 2px orange, 0 0 2em blue, 0 0 0.1em blue",
              fontFamily: "sans-serif",
              fontSize: "6.5vw",
              fontWeight: "bold",
              marginBottom: "0.2em",
            }}
          >
            Our Kids Our Pride
          </h1>
          <p
            style={{
              color: "white",
              fontFamily: "sans-serif",
              fontSize: "1.5vw",
              wordSpacing:"10px",
              fontWeight: "normal",
              lineHeight: "1.5",
              textShadow: "#fc0 1px 0 10px",
              padding: "0 1em",
            }}
          >
            "Every child is a unique star, destined to shine. Nurture their
            dreams, empower their minds, and watch them illuminate the world
            with their brilliance."
          </p>
        </div>

        {/* --- Buttons Section --- */}
        <div className="hero-buttons-container">
          <button className="hero-button" type="button">
            <span></span>
            Learn More..
          </button>
          <button className="hero-button" type="button">
            <span></span>
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeCover;

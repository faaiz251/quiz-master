import React from "react";
import { useNavigate } from "react-router-dom";

export function MainNav() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: '50 100px'
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "70px 150px",
        }}
      >
        <div className='main-header'
        style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "26px",
              marginRight: "10px",
              color: "#f9a825",
              cursor: "pointer",
            }}
          >
            Quiz
          </div>
          <div
            style={{
              fontSize: "15px",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
           Master
          </div>
        </div>
        <div className="header2"
          style={{
            display: "flex",
            gap: "100px",
          }}
        >
          <div
            onClick={() => {
              navigate("/signup");
            }}
            style={{ cursor: "pointer"}}
          >
            Login
          </div>
          <div
            onClick={() => {
              navigate("/signin");
            }}
            style={{ cursor: "pointer"}}
          >
           Register
          </div>
        </div>
      </div>
    </div>
  );
}
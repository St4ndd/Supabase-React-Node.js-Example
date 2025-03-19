import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f3f3f3" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", textAlign: "center" }}>
        <h2>Welcome</h2>
        <p>Please choose an option:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          <Link to="/register" style={{ backgroundColor: "#007BFF", color: "white", padding: "10px", borderRadius: "4px", textDecoration: "none" }}>
            Register
          </Link>
          <Link to="/login" style={{ backgroundColor: "#28a745", color: "white", padding: "10px", borderRadius: "4px", textDecoration: "none" }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
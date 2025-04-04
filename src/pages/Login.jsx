import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      setEmail("");
      setPassword("");
      return;
    }

    if (data) {
      navigate("/dashboard");
      return null;
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f3f3f3" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        {message && <p style={{ textAlign: "center", color: "red" }}>{message}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
          />
          <input
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            style={{ backgroundColor: "#007BFF", color: "white", padding: "10px", borderRadius: "4px", cursor: "pointer", border: "none" }}
          >
            Log in
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have an account?
          <Link to="/register" style={{ color: "#007BFF", textDecoration: "none", marginLeft: "5px" }}> Register.</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
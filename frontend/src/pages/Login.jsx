import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post, saveUser, homeFor } from "../api";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await post("/auth/login", { email, password });
      saveUser(user);
      nav(homeFor(user.role));   // role-based redirect
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, margin: "40px auto", display: "grid", gap: 8 }}>
      <h2>Berdeng-Gubat Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}
      <p>No account? <Link to="/register">Register</Link></p>
    </form>
  );
}
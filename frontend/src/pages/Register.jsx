import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../api";

export default function Register() {
  const nav = useNavigate();
  const [f, setF] = useState({ firstName: "", lastName: "", email: "", contactNo: "", password: "" });
  const [msg, setMsg] = useState("");

  const change = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await post("/auth/register", f);
      alert("Account created! Please log in.");
      nav("/login");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, margin: "40px auto", display: "grid", gap: 8 }}>
      <h2>Create account</h2>
      <input name="firstName" placeholder="First name" onChange={change} required />
      <input name="lastName" placeholder="Last name" onChange={change} required />
      <input name="email" type="email" placeholder="Email" onChange={change} required />
      <input name="contactNo" placeholder="Contact no." onChange={change} />
      <input name="password" type="password" placeholder="Password (min 6)" onChange={change} required />
      <button type="submit">Register</button>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}
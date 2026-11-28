import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../api";

// Every dashboard wraps its content in this: gives a header + logout
export default function DashboardShell({ title, children }) {
  const nav = useNavigate();
  const user = getUser();
  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{title}</h2>
        <div>
          {user?.firstName} ({user?.role}){" "}
          <button onClick={() => { logout(); nav("/login"); }}>Logout</button>
        </div>
      </header>
      {children}
    </div>
  );
}
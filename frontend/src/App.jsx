import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getUser, homeFor } from "./api";
import Protected from "./components/Protected";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrgDashboard from "./pages/organization/OrgDashboard";

function Home() {
  const u = getUser();
  return <Navigate to={u ? homeFor(u.role) : "/login"} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<Protected role="USER"><UserDashboard /></Protected>} />
        <Route path="/admin" element={<Protected role="ADMIN"><AdminDashboard /></Protected>} />
        <Route path="/organization" element={<Protected role="ORGANIZATION"><OrgDashboard /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}
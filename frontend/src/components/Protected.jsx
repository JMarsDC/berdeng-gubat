import { Navigate } from "react-router-dom";
import { getUser, homeFor } from "../api";

export default function Protected({ role, children }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={homeFor(user.role)} replace />;
  return children;
}
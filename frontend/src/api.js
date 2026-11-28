export const API = "http://localhost:8080/api";

export const getUser = () => JSON.parse(localStorage.getItem("user") || "null");
export const saveUser = (u) => localStorage.setItem("user", JSON.stringify(u));
export const logout = () => localStorage.removeItem("user");

export const homeFor = (role) =>
  role === "ADMIN" ? "/admin" : role === "ORGANIZATION" ? "/organization" : "/user";

export async function post(path, body) {
  const res = await fetch(API + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || "Request failed");
  return JSON.parse(text);
}

export async function get(path) {
  const res = await fetch(API + path);
  const text = await res.text();
  if (!res.ok) throw new Error(text || "Request failed");
  return JSON.parse(text);
}
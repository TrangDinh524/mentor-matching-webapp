import { config } from "../config/config.js";

export async function registerUser(data) {
  try {
    const res = await fetch(`${config.API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw result;
    return { success: true, message: "Registration successful! Please login." };
  } catch (err) {
    return {
      success: false,
      message: err.error || "Registration failed. Please try again.",
    };
  }
}
export async function loginUser(data) {
  try {
    const res = await fetch(`${config.API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw result;
    // Store token
    if (result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("isLoggedIn", "true");
    }
    return { success: true, message: "Login successful!" };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

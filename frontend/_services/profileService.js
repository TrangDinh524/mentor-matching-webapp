import { config } from "../config/config.js";

export async function getProfile() {
  try {
    const res = await fetch(`${config.API_URL}/api/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateProfile(data) {
  try {
    console.log("called here");

    const res = await fetch(`${config.API_URL}/api/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw result;
    return { success: true, message: "Profile updated successfully!" };
  } catch (err) {
    return {
      success: false,
      message: err.error || "Failed to update profile. Please try again.",
    };
  }
}

export async function deleteProfile() {
  try {
    const res = await fetch(`${config.API_URL}/api/profile`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result);
    return { success: true, message: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

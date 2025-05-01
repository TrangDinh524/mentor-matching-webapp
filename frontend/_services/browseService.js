import { config } from "../config/config.js";

export async function getUsers(filters = {}) {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    if (filters.role) queryParams.append("role", filters.role);
    if (filters.skills) queryParams.append("skills", filters.skills);
    if (filters.interests) queryParams.append("interests", filters.interests);

    const queryString = queryParams.toString();
    const url = `${config.API_URL}/api/browse${
      queryString ? `?${queryString}` : ""
    }`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
}
export async function sendConnectionRequest(receiverId) {
  try {
    const res = await fetch(`${config.API_URL}/api/browse/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ receiverId }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to send connection request");
    }
    return await res.json();
  } catch (err) {
    console.error("Error sending connection request:", err);
    throw err;
  }
}

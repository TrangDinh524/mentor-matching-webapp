import { loginUser } from "../../_services/authService.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        email: form.email.value.trim(),
        password: form.password.value.trim(),
      };

      if (!data.email || !data.password) {
        return alert("Both fields are required.");
      }

      const result = await loginUser(data);
      alert(result.message);
      if (result.success) location.href = "/";
    });
  }
});

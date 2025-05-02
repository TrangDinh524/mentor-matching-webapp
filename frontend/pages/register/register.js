import { registerUser } from "../../_services/authService.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        username: form.username.value.trim(),
        email: form.email.value.trim(),
        password: form.password.value.trim(),
      };

      if (!data.username || !data.email || !data.password) {
        return alert("All fields required.");
      }

      const result = await registerUser(data);
      alert(result.message);
      if (result.success) location.href = "../login/login.html";
    });
  }
});

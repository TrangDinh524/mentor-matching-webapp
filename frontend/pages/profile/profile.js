import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../../_services/profileService.js";

let isEdit = false;

export function onEdit() {
  isEdit = !isEdit; // Toggle edit mode
  const editBtn = document.getElementById("edit-profile-btn");

  const form = document.getElementById("profileForm");
  const formInputs = form.querySelectorAll("input, textarea, select");

  if (isEdit) {
    // Switch to edit mode
    editBtn.textContent = "Save Changes";
    editBtn.classList.add("save-mode");
    formInputs.forEach((input) => (input.disabled = false));
  } else {
    // Save changes
    editBtn.textContent = "Edit profile";
    editBtn.classList.remove("save-mode");

    formInputs.forEach((input) => (input.disabled = true));

    // Save changes to backend
    const formData = {
      bio: form.bio.value,
      skills: form.skills.value,
      interests: form.interests.value,
      role: form.role.value,
    };

    console.log("Saving profile data:", formData);

    // Save to backend
    updateProfile(formData)
      .then(() => alert("Profile updated successfully!"))
      .catch((error) => {
        alert("Error updating profile: " + error.message);

        // Re-enable editing if save failed
        formInputs.forEach((input) => (input.disabled = false));
        editBtn.textContent = "Save Changes";
        editBtn.classList.add("save-mode");
        isEdit = true;
      });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("edit-profile-btn").addEventListener("click", onEdit);

  try {
    const profile = await getProfile();

    // Update display elements
    const form = document.getElementById("profileForm");
    form.bio.value = profile.bio || "";
    form.skills.value = profile.skills || "";
    form.interests.value = profile.interests || "";

    document.getElementById("display-name").textContent =
      profile.name || "No name set";
    document.getElementById("display-username").textContent =
      `@${profile.username}` || "No username set";

    const roleBadge = document.getElementById("role-badge");
    if (profile.role) {
      roleBadge.textContent = profile.role;
      roleBadge.style.display = "inline-block"; // Show the badge
    } else {
      roleBadge.style.display = "none"; // Hide the badge
    }
    // Set the current role in the select dropdown
    const roleSelect = document.getElementById("role");
    if (profile.role) {
      roleSelect.value = profile.role;
    }
  } catch (error) {
    window.location.href = "/";
    console.error("Error loading profile:", error);
    alert("Failed to load profile data");
  }
});

function updateTags(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  items.split(",").forEach((item) => {
    if (item.trim()) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = item.trim();
      container.appendChild(tag);
    }
  });
}

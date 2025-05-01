// frontend/pages/browse/browse.js
import { getUsers } from "../../_services/browseService.js";
import { sendConnectionRequest } from "../../_services/browseService.js";

let users = [];
let filteredUsers = [];

function createUserCard(user) {
  const template = document.getElementById("user-card-template");
  const card = template.content.cloneNode(true);

  // Set user information
  card.querySelector(".user-name").textContent = user.name;
  card.querySelector(".role-badge").textContent = user.role;
  card.querySelector(".avatar-img").src =
    user.avatar || "../../assets/images/default-avatar.jpg";

  // Set skills
  const skillsList = card.querySelector(".skills-list");
  updateTags(skillsList, user.skills);

  // Set interests
  const interestsList = card.querySelector(".interests-list");
  updateTags(interestsList, user.interests);

  // Set up connection button
  const connectionBtn = card.querySelector(".connection-btn");
  updateConnectionButton(connectionBtn, user);

  // Add connection button click handler
  connectionBtn.addEventListener("click", async () => {
    if (connectionBtn.classList.contains("disabled")) {
      return;
    }

    try {
      if (!user.connectionStatus) {
        // Send new connection request
        connectionBtn.disabled = true;
        const response = await sendConnectionRequest(user.id);
        user.connectionStatus = "pending";
        user.isRequestSender = true;
      }
      updateConnectionButton(connectionBtn, user);
    } catch (error) {
      console.error("Error handling connection:", error);
      alert("Failed to process connection request");
      connectionBtn.disabled = false;
    }
  });

  return card;
}
function updateConnectionButton(button, user) {
  // Remove all status classes
  button.classList.remove("pending", "accepted", "rejected", "disabled");

  switch (user.connectionStatus) {
    case null:
      button.textContent = "Connect";
      break;
    case "pending":
      button.textContent = user.isRequestSender
        ? "Request Pending"
        : "Respond to Request";
      button.classList.add("pending", "disabled");
      break;
    case "accepted":
      button.textContent = "Connected";
      button.classList.add("accepted", "disabled");
      break;
    case "rejected":
      button.textContent = "Request Rejected";
      button.classList.add("rejected", "disabled");
      break;
  }
}
function updateTags(container, items) {
  container.innerHTML = "";

  console.log("items", items);
  const itemsArray = (items || "").toString().split(",");

  itemsArray.forEach((item) => {
    if (item.trim()) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = item.trim();
      container.appendChild(tag);
    }
  });
}

function renderUsers() {
  const usersGrid = document.getElementById("users-grid");
  usersGrid.innerHTML = "";

  if (filteredUsers.length === 0) {
    usersGrid.innerHTML =
      '<p class="no-results">No users found matching your criteria.</p>';
    return;
  }

  filteredUsers.forEach((user) => {
    const card = createUserCard(user);
    usersGrid.appendChild(card);
  });
}

async function applyFilters() {
  const roleFilter = document.getElementById("role-filter");
  const skillsFilter = document.getElementById("skills-filter");
  const interestsFilter = document.getElementById("interests-filter");

  const filters = {
    role: roleFilter.value,
    skills: skillsFilter.value,
    interests: interestsFilter.value,
  };

  try {
    users = await getUsers(filters);
    filteredUsers = [...users];
    renderUsers();
  } catch (error) {
    console.error("Error applying filters:", error);
    const usersGrid = document.getElementById("users-grid");
    usersGrid.innerHTML =
      '<p class="error-message">Failed to load users. Please try again later.</p>';
  }
}

function clearFilters() {
  const roleFilter = document.getElementById("role-filter");
  const skillsFilter = document.getElementById("skills-filter");
  const interestsFilter = document.getElementById("interests-filter");

  roleFilter.value = "";
  skillsFilter.value = "";
  interestsFilter.value = "";

  applyFilters();
}

document.addEventListener("DOMContentLoaded", async () => {
  // Add event listeners
  document
    .getElementById("apply-filters")
    .addEventListener("click", applyFilters);
  document
    .getElementById("clear-filters")
    .addEventListener("click", clearFilters);

  // Initial load
  try {
    users = await getUsers();
    filteredUsers = [...users];
    renderUsers();
  } catch (error) {
    console.error("Error loading users:", error);
    const usersGrid = document.getElementById("users-grid");
    usersGrid.innerHTML =
      '<p class="error-message">Failed to load users. Please try again later.</p>';
  }
});

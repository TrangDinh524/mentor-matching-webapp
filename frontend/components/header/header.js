fetch("/components/header/header.html")
  .then((res) => res.text())
  .then((html) => {
    document.body.insertAdjacentHTML("afterbegin", html);

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const nav = document.getElementById("main-nav");
    if (nav) {
      if (isLoggedIn) {
        nav.innerHTML = `
          <a href="/pages/profile/profile.html">Profile</a> |
          <a href="/pages/browse/browse.html">Browse Mentor</a> |
          <a href="#" id="logout-link">Logout</a>
        `;
      } else {
        nav.innerHTML = `
          <a href="/pages/login/login.html">Login</a> |
          <a href="/pages/register/register.html">Register</a>
        `;
      }
    }

    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", function (e) {
        localStorage.clear();
        window.location.replace("/");
      });
    }
  });

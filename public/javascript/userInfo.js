export async function setupUserInfo(container) {
  const userContainer = container.querySelector(".user-container p");
  const logoutButtonUserContainer = container.querySelector(
    ".user-container button"
  );
  const logoutButtonHamburger = container.querySelector(
    ".div-routes-phone .logout"
  );

  try {
    const response = await fetch("/api/current-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      userContainer.textContent = "Hello " + data.username;
    } else {
      const errorText = await response.text();
      console.error("Error fetching user information:", errorText);
      userContainer.textContent = "Guest";
    }
  } catch (error) {
    console.error("Error fetching user information:", error);
    userContainer.textContent = "Guest";
  }

  async function handleLogout() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/login";
      } else {
        alert("Error logging out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  }

  if (logoutButtonUserContainer) {
    logoutButtonUserContainer.addEventListener("click", handleLogout);
  }

  if (logoutButtonHamburger) {
    logoutButtonHamburger.addEventListener("click", handleLogout);
  }
}

console.log("JavaScript file loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      console.log("Form submit event");
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      console.log(`Username: ${username}, Password: ${password}`);

      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        console.log("Response received", response);
        if (response.ok) {
          console.log(response.status);
          window.location.href = "/";
        } else {
          alert(response.status);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      }
    });
  } else {
    console.error("Login form not found");
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
      console.log("Signup form submit event");
      event.preventDefault();

      const username = document.getElementById("regUsername").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      const confirmPassword =
        document.getElementById("regConfirmPassword").value;

      console.log(
        `Username: ${username}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`
      );

      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            confirm_password: confirmPassword,
          }),
        });
        console.log("Response received", response);
        if (response.ok) {
          console.log("User created successfully");
          alert("User created successfully! Please login.");
          window.location.href = "/login";
        } else {
          const responseData = await response.json();
          alert(responseData.data || response.status);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred during registration. Please try again.");
      }
    });
  } else {
    console.error("Signup form not found");
  }
});

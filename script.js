// Register
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm-password").value;
    const message = document.getElementById("register-message");

    if (password !== confirm) {
      showMessage(message, "Passwords do not match.", false);
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((user) => user.email === email)) {
      showMessage(message, "Email already registered.", false);
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    showMessage(message, "Registration successful! You can now login.", true);
    registerForm.reset();
  });
}

// Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const message = document.getElementById("login-message");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      showMessage(message, `Welcome, ${matchedUser.name}! ✅`, true);
      loginForm.reset();
      // Redirect to dashboard if needed
      // window.location.href = "dashboard.html";
    } else {
      showMessage(message, "Invalid email or password ❌", false);
    }
  });
}

// Message display function
function showMessage(el, msg, isSuccess) {
  el.textContent = msg;
  el.className = isSuccess ? "message success" : "message error";
}

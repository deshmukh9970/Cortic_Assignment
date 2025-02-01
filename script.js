document.addEventListener("DOMContentLoaded", function () {
    // Registration Function
    window.register = function (event) {
        event.preventDefault();

        let username = document.getElementById("register-username").value;
        let password = document.getElementById("register-password").value;
        let role = document.getElementById("register-role").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the username already exists
        let userExists = users.some(user => user.username === username);
        if (userExists) {
            document.getElementById("message").textContent = "Username already exists!";
            return;
        }

        // Save the user details in localStorage
        users.push({ username, password, role });
        localStorage.setItem("users", JSON.stringify(users));

        document.getElementById("message").textContent = "Registration successful! You can now login.";
        document.getElementById("register-form").reset();
    };

    // Login Function
    window.login = function (event) {
        event.preventDefault();

        let username = document.getElementById("login-username").value;
        let password = document.getElementById("login-password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            document.getElementById("message").textContent = "Login successful!";
            
            // Redirect based on user role
            if (user.role === "ADMIN") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "user.html";
            }
        } else {
            document.getElementById("message").textContent = "Invalid username or password!";
        }
    };

    // Logout Function
    window.logout = function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    };
});

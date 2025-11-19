

// Switch between login/register
function showRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}

// Register
function register() {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const pass = document.getElementById("regPass").value;

    if (!name || !email || !pass) return alert("Fill all fields");

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if exists
    if (users.some(u => u.email === email)) {
        return alert("User already exists");
    }

    users.push({ name, email, pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created! You can login now.");
    showLogin();
}

// Login
function login() {
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPass").value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(u => u.email === email && u.pass === pass);

    if (!user) return alert("Invalid login");

    localStorage.setItem("loggedUser", JSON.stringify(user));
    window.location = "home.html";
}

// Logout
function logout() {
    localStorage.removeItem("loggedUser");
    window.location = "index.html";
}

// Add post
function addPost() {
    const content = document.getElementById("postInput").value;
    if (!content) return;

    const user = JSON.parse(localStorage.getItem("loggedUser"));

    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.unshift({ name: user.name, text: content, time: new Date().toLocaleString() });

    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("postInput").value = "";
    loadFeed();
}

// Load posts
function loadFeed() {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const container = document.getElementById("posts");
    container.innerHTML = "";

    posts.forEach(p => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `<h4>${p.name}</h4><small>${p.time}</small><p>${p.text}</p>`;
        container.appendChild(div);
    });
}

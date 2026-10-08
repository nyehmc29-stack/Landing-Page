const tombol = document.getElementById("tombol");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

function login() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (username === "" && password === "") {
        alert("Username dan password harus diisi!")
        return;
    }
    if (username === "") {
        alert("Username harus diisi!")
        return
    }
    if (password === "") {
        alert("Password harus diisi!")
        return
    }
    else {
        window.location.href = 'index.html'
    }
};

tombol.addEventListener("click", login);
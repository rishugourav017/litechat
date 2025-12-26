const socket = io();
const input = document.getElementById("msg");
const messages = document.getElementById("messages");
const themeBtn = document.getElementById("themeBtn");

let username = localStorage.getItem("username");
if (!username) {
  username = prompt("Enter your name:");
  localStorage.setItem("username", username);
}

/* SEND MESSAGE */
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    socket.emit("message", {
      user: username,
      text: input.value,
    });
    input.value = "";
  }
});

/* RECEIVE MESSAGE */
socket.on("message", (data) => {
  const div = document.createElement("div");
  div.classList.add("msg");

  if (data.user === username) {
    div.classList.add("me");
  } else {
    div.classList.add("other");
  }

  div.innerHTML = `
    <div class="username">${data.user}</div>
    <div>${data.text}</div>
  `;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

/* THEME TOGGLE */
themeBtn.onclick = () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
};

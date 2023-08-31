const h1 = document.querySelector("h1")

let socket = new WebSocket("ws://localhost:8765")
socket.addEventListener("open", () => (h1.innerText = "Open"))
socket.addEventListener("close", () => (h1.innerText = "Close"))
socket.addEventListener("error", () => (h1.innerText = "Error"))

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8765")

//INNER ELEMENTNTS
const server_status = document.querySelector("#status")
const main = document.querySelector("main")
const input = document.querySelector("input")
const button = document.querySelector("button")

socket.addEventListener("open", (event) => {
    server_status.innerText = "Server Connnected"
})

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const msg = input.value
        socket.send(msg)
        from_client(msg)
        input.value = ""
    }
})
button.addEventListener("click", () => {
    const msg = input.value
    socket.send(msg)
    from_client(msg)
    input.value = ""
})

function from_client(message) {
    const h3 = document.createElement("h3")
    h3.innerText = "From Client"
    main.appendChild(h3)
    const p = document.createElement("p")
    p.innerText = message
    main.appendChild(p)
}

function from_server(message) {
    const h3 = document.createElement("h3")
    h3.innerText = "From Server"
    main.appendChild(h3)
    const p = document.createElement("p")
    p.innerText = message
    main.appendChild(p)
}

// Listen for messages
socket.addEventListener("message", (event) => {
    from_server(event.data)
})

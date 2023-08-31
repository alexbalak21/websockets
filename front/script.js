// Create WebSocket connection.

//INNER ELEMENTNTS
const server_status = document.querySelector("#status")
const main = document.querySelector("main")
const input = document.querySelector("input")
const button = document.querySelector("button")

function connect(adress = "ws://localhost:8765") {
    let socket = null
    try {
        socket = new WebSocket(adress)
        server_status.innerText = "Server Connnected"
        server_status.style.color = "Green"
        socket.addEventListener("open", () => socket.send("Client Connnected"))
    } catch (err) {
        return null
    }
    return socket
}

function Listen_to_client(socket) {
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && input.value !== "") {
            const msg = input.value
            socket.send(msg)
            from_client(msg)
            input.value = ""
        }
    })
    button.addEventListener("click", () => {
        const msg = input.value
        if (input.value !== "") {
            socket.send(msg)
            from_client(msg)
            input.value = ""
        }
    })
    return socket
}

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

function Listen_to_server(socket) {
    socket.addEventListener("message", (event) => {
        from_server(event.data)
    })
}

function Disconnect(socket) {
    socket.close(1000, "Disconnect")
}

function Listen_to_close(socket) {
    window.addEventListener("beforeunload", () => {
        // socket.send("Closing connection")
        Disconnect(socket)
    })
}

function app() {
    let socket = null
    try {
        socket = connect()
    } catch {
        return null
    }
    Listen_to_server(socket)
    Listen_to_client(socket)
    Listen_to_close(socket)
}
app()

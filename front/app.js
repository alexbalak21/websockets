// Create WebSocket connection.

//INNER ELEMENTNTS
const server_status = document.querySelector("#status")
const chat = document.querySelector("#chat")
const input = document.querySelector("#input")
const button = document.querySelector("button")
const log_btn = document.getElementById("log")
const modal = document.querySelector("dialog")

// LOG IN / OUT
log_btn.onclick = () => {
    if (SOCKET.readyState !== 1) return null
    else modal.showModal()
}

//CREEATINGCONNECTION SOCKET

input.addEventListener("keypress", (e) => {
    if (e.ctrlKey) console.log("Ctrl + ", e.key === "\n")
    console.log(e.key)
})

const SOCKET = new WebSocket("ws://localhost:8765")

function Listen_to_client() {
    input.addEventListener("keypress", (e) => {
        if (SOCKET.readyState !== 1) {
            console.log("Server not Connected")
            return null
        }
        if (e.ctrlKey && e.key === "\n" && input.value !== "") {
            const msg = input.value
            SOCKET.send(msg)
            from_client(msg)
            input.value = ""
        }
    })
    button.addEventListener("click", () => {
        if (SOCKET.readyState !== 1) {
            console.log("Server not Connected")
            return null
        }
        const msg = input.value
        if (input.value !== "") {
            SOCKET.send(msg)
            from_client(msg)
            input.value = ""
        }
    })
    return null
}

function log_in_server(user) {
    const login_message = JSON.stringify({ login: user })
    SOCKET.send(login_message)
    return null
}

function Listen_to_server() {
    if (SOCKET.readyState > 1) {
        console.log("Server not Connected")
        return null
    }
    SOCKET.onmessage = (event) => from_server(event.data)
}

function from_client(message) {
    const h3 = document.createElement("h3")
    h3.innerText = "From Client"
    chat.appendChild(h3)
    const p = document.createElement("p")
    p.innerText = message
    chat.appendChild(p)
}

function from_server(message) {
    const h3 = document.createElement("h3")
    h3.innerText = "From Server"
    chat.appendChild(h3)
    const p = document.createElement("p")
    p.innerText = message
    chat.appendChild(p)
}

function Disconnect() {
    SOCKET.close(1000, "Disconnect")
}

function Listen_to_window_close() {
    window.addEventListener("beforeunload", () => {
        Disconnect()
    })
}
function server_status_checker() {
    SOCKET.onopen = () => {
        server_status.innerText = "Server Connected"
        server_status.style.color = "green"
    }
    SOCKET.onerror = () => {
        server_status.innerText = "Server Error"
        server_status.style.color = "yellow"
    }
    SOCKET.onclose = () => {
        server_status.innerText = "Server Closed"
        server_status.style.color = "red"
    }
}

function app() {
    server_status_checker()
    Listen_to_server()
    Listen_to_client()
    Listen_to_window_close()
}
app()

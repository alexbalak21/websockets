//MODAL SECTION
const modal = document.querySelector("dialog")
const log_btn = document.getElementById("log")
const modal_input = document.getElementById("modal_input")
const modal_login = document.getElementById("login")
const modal_close_btn = document.getElementById("close")

// LOG IN / OUT
log_btn.onclick = () => {
    if (SOCKET.readyState !== 1) return null
    else modal.showModal()
    modal_close_btn.onclick = () => modal.close()
    modal_login.onclick = () =>
        modal_input.value ? log_in_server(modal_input.value) : null
    modal.addEventListener("keypress", (e) =>
        e.key === "Enter" && modal_input.value
            ? log_in_server(modal_input.value)
            : null
    )
}

function log_in_server(user = "") {
    const message = JSON.stringify({ user: user, state: 1 })
    SOCKET.send(message)
    modal.close()
}

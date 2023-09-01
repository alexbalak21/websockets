//MODAL SECTION
const modal = document.querySelector("dialog")
const log_btn = document.getElementById("log")
const modal_input = document.getElementById("modal_input")
const modal_login_btn = document.getElementById("login")
const modal_close_btn = document.getElementById("close")

// LOG IN / OUT
log_btn.addEventListener("click", show_login_modal)

function show_login_modal() {
    if (SOCKET.readyState !== 1) return null
    else modal.showModal()
    // ADDING EVENT LISTENNERS ON modal ELEMENTS
    modal_close_btn.addEventListener("click", () => modal.close())
    modal_login_btn.addEventListener("click", () =>
        modal_input.value ? log_in_server(modal_input.value) : null
    )
    // ON ENTER
    modal.addEventListener("keypress", (e) =>
        e.key === "Enter" && modal_input.value
            ? log_in_server(modal_input.value)
            : null
    )
}

function chage_log_button() {
    if (log_btn.innerText === "Log-In") {
        log_btn.innerText = "Log-Out"
        log_btn.removeEventListener("click", show_login_modal)
    } else if (log_btn.innerText === "Log-Out") {
        log_btn.innerText = "Log-In"
        log_btn.addEventListener("click", show_login_modal)
    }
    return null
}

function log_in_server(user = "") {
    const message = JSON.stringify({ user: user, state: 1 })
    SOCKET.send(message)
    modal.close()
    USER = user
    //CHECK IF USER IS CONNECTED TO THE SERVER BY RECIVINNG USER ID FROM THE SERVER
    chage_log_button()
}

function log_out() {
    if (!USER) return null
}

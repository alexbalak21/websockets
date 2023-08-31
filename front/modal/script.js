const modal = document.querySelector("dialog")
const open_btnn = document.getElementById("open")
const close_btn = document.getElementById("close")
const login_btn = document.getElementById("login")
const login_input = document.querySelector("input")
const login_name = document.getElementById("name")

open_btnn.addEventListener("click", () => modal.showModal())

close_btn.addEventListener("click", () => modal.close())
login_btn.addEventListener("click", () => {
    if (login_input.value) {
        login_name.innerText = login_input.value
        modal.close()
    }
})

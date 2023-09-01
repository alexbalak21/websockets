const users = document.querySelectorAll(".user")
const stat = document.getElementById("status")
console.log(stat)
users.forEach(
    (user) =>
        (user.onclick = () => {
            users.forEach((u) => {
                u.style.color = "black"
                u.style.backgroundColor = "white"
            })
            user.style.color = "blue"
            user.style.backgroundColor = "darkgrey"
        })
)

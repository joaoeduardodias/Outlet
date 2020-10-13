let show = true;

const menuSection = document.querySelector(".menu-section")
const menuToggle = document.querySelector(".menu-toggle")

menuToggle.addEventListener('click', () => {
    document.body.style.overflow = show ? 'hidden' : 'initial'

    menuSection.classList.toggle("on", show)
    show = !show;
})

const buttonRegister = document.querySelector(".btn-Register")
const buttonLogin = document.querySelector(".btn-login")
const buttonLogout = document.querySelector(".btn-logout")
const buttonCart = document.querySelector(".btn-cart")
const buttonDashboard = document.querySelector(".btn-dash")
const token = localStorage.getItem("Authorization")

console.log(token)

if (token) {
    const { administrador } = JSON.parse(atob(token.split(".")[1]));

    buttonRegister.classList.add('logged')
    buttonLogin.classList.add('logged')
    buttonLogout.style.display = 'flex'
    buttonCart.style.display = administrador == 0 ? 'flex' : 'none'
    buttonDashboard.style.display = administrador == 1 ? 'flex' : 'none'
}

buttonLogout.addEventListener('click', () => {
    localStorage.clear()
    location.href = '/'


})
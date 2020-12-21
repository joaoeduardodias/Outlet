const baseurl = "https://ecomerceoutlet.herokuapp.com";
const c = (el) => document.querySelector(el);
const token = localStorage.getItem('Authorization')
let idUser;

async function getUser() {
    const email = document.getElementById('email').value
    const user = await fetch(`${baseurl}/show/${email}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        },
        mode: "cors",
    })
    const data = await user.json()
    if (data.message == 'Token invalid.') {
        location.href = '../pages/login.html'
    }
    if (data.administrador == 1) {
        alert("Usuario ja é ADM")
    }
    if (data.message == 'User not exist') {
        alert('Usuário não cadastrado')
    }
    if (data.administrador == 0) {
        const div = c('.hiddem')
        div.style.display = 'flex'
        document.getElementById('name').innerHTML = data.name
        document.getElementById('nameUser').innerHTML = data.name
    }
    idUser = data.id

}

const btnSearch = c('#Usersearch')
btnSearch.addEventListener('click', (event) => {
    getUser()
    event.preventDefault()
})

async function UpdateUser() {

    const User = {
        administrador: 1
    }


    const message = await fetch(`${baseurl}/userADM/${idUser}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        },
        mode: 'cors',
        body: JSON.stringify(User)
    })
    const messageJson = await message.json()
    if (messageJson.message == 'success') {
        const btn = c('#addADM')
        setTimeout(() => {
            btn.style.backgroundColor = "#1cca0c";
            btn.innerText = "Administrador Adicionado";
            setTimeout(() => {
                btn.style.backgroundColor = "#f67600";
                btn.innerText = "Adicionar Administrador";
            }, 1900);
        }, 500);

    }
}
c('#addADM').addEventListener('click', (event) => {
    event.preventDefault()
    UpdateUser()
})
const baseurl = "https://ecomerceoutlet.herokuapp.com";
let idUser;
async function Register() {
    try {
        const { value: name } = document.getElementById("name");
        const { value: email } = document.getElementById("email");
        const { value: telephone } = document.getElementById("telephone");
        const { value: password } = document.getElementById("password");
        const tel = parseInt(telephone)

        const data = {
            name,
            email,
            password,
            whatsapp: tel,
        };

        const dataUser = await fetch(baseurl + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            mode: "cors",
            body: JSON.stringify(data),
        });
        const message = await dataUser.json();
        idUser = message.idUser;
        if (message.message == 'Email already registered, try another') {
            valid('Email já cadastrado')
        }
        if (message.message == 'success') {
            await create(idUser)

        }
    } catch (error) {
        console.log(error);
    }
}

async function tocall() {
    await Register();
}

const form = document.querySelector("form");
form.onsubmit = function(e) {
    tocall()
    e.preventDefault();
};
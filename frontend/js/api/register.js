const baseurl = "http://localhost:3333";
let idUser;
async function Register() {
    try {
        const { value: name } = document.getElementById("name");
        const { value: email } = document.getElementById("email");
        const { value: telephone } = document.getElementById("telephone");
        const { value: password } = document.getElementById("password");
        const data = {
            name,
            email,
            password,
            whatsapp: telephone,
        };

        const dataUser = await fetch(baseurl + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            mode: "cors",
            body: JSON.stringify(data),
        });
        const message = await dataUser.json();
        idUser = message.idUser;
    } catch (error) {
        console.log(error);
    }
}

async function tocall() {
    await Register();
    await create(idUser)
}

const form = document.querySelector("form");
form.onsubmit = function(e) {
    tocall()
    e.preventDefault();
};
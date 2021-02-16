const form = document.querySelector("form");
form.onsubmit = function(e) {
    e.preventDefault();
    login();
};
const baseurl = "https://ecomerceoutlet.herokuapp.com";

async function login() {
    try {
        const formData = new FormData(form);

        const response = await fetch(baseurl + "/login", {
            method: "post",
            headers: {
                Accept: "application/json",
            },

            body: formData,
        });
        const data = await response.json();
        if (data.message === "Email incorrect") {
            valid("Email Incorreto");
        }
        if (data.message === "Invalid  Password") {
            valid("Senha Incorreta");
        }
        if (data.message === "Valid") {
            const token = await response.headers.get("auth_token");
            localStorage.setItem("Authorization", token); // salvando no localStorage
            const dataUser = JSON.parse(atob(token.split(".")[1])); // decodificando o token
            localStorage.setItem("Zip_code", dataUser.zip_code); // salvando o cep no localstorage

            if (dataUser.administrador === 1) {
                document.getElementById("nameUser").innerText = dataUser.name;
                const body = document.getElementById("body-modal");
                body.classList.add("modal");

                const divLogin = document.getElementById("div-login");
                divLogin.style.display = "none";
                const modal = document.getElementById("div-modal");
                modal.style.display = "";
            } else {
                location.href = "/";
            }
        }
    } catch (error) {
        console.error(error);
    }
}

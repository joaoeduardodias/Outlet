const form = document.getElementById("form-login");
form.onsubmit = function (e) {
	login();
	e.preventDefault();
};
const baseurl = "http://localhost:3333";

async function login() {
	try {
		const { value: email } = document.getElementById("input-email");
		const { value: password } = document.getElementById("input-password");

		const myHeaders = new Headers();

		myHeaders.append("Authorization", "Basic " + btoa(email + ":" + password)),
		myHeaders.append("Content-Type", "application/json");

		const response = await fetch(baseurl + "/login", {
			method: "post",
			headers: myHeaders,
			mode: "cors",
		});

		const data = await response.json();
		if (data.message === "Email incorrect") {
			alert("Email Incorreto");
		}
		if (data.message === "Invalid  Password") {
			alert("Senha Incorreta");
		}
		if (data.message === "Valid") {
			const token = await response.headers.get("auth_token");
			localStorage.setItem("Authorization", token); // salvando no localStorage
			const dataUser = JSON.parse(atob(token.split(".")[1])); // decodificando o token
			console.log(dataUser);

			if (dataUser.administrador === 1) {
				const body = document.getElementById('body-modal')
				body.classList.add('modal')

				const divLogin = document.getElementById('div-login')
				divLogin.classList.add('-modal')
				const modal = document.getElementById('div-modal')
				modal.style.display = ""

				console.log("sou adm");
			} else {
				location.href = "../pages/index.html";
			}
		}
	} catch (error) {
		await console.log("errou");
		console.error(error);
	}
}

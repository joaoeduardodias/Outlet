const form = document.getElementById("form-login");
form.onsubmit = function(e) {
    login();
    e.preventDefault();
};

async function login() {
    try {
        const { value: email } = document.getElementById("input-email");
        const { value: password } = document.getElementById("input-password");

        const headers = {
            "Authorization": "Basic " + btoa(email + ":" + password),
            "Content-Type": "application/json"
        }


        const response = await axios.post(baseurl + "/login", { headers }

        );

        const data = await response.json();
        if (data.message === "Email incorrect") {
            alert("Email Incorreto");
        }
        if (data.message === "Invalid  Password") {
            alert("Senha Incorreta");
        }
        const token = await response.headers.get('auth-token');
        console.log(token);
        console.log("deu certo");
    } catch (error) {
        await console.log("errou");
        console.error(error);
    }
}

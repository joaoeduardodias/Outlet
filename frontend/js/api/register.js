const form = document.querySelector('form')
form.onsubmit = function(e) {
    Register()
    e.preventDefault()
}
const baseurl = 'http://localhost:3333'

async function Register() {
    try {
        const { value: name } = document.getElementById('name')
        const { value: email } = document.getElementById('email')
        const { value: telephone } = document.getElementById('telephone')
        const { value: password } = document.getElementById('password')
        const data = {
            name,
            email,
            password,
            whatsapp: telephone

        }



        await fetch(baseurl + "/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify(data),
        });
        location.href = "../../pages/login.html"


    } catch (error) {
        console.log('errou')
        console.log(error)
    }


}
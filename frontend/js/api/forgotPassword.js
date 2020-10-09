const form = document.querySelector("form")
form.onsubmit = function(e) {
    SendMail()
    e.preventDefault();
}
const Baseurl = "http://localhost:3333";



async function SendMail() {
    try {
        const { value: email } = document.getElementById("email");

        const myHeaders = new Headers();

        myHeaders.append("Authorization", "Basic " + btoa(email))
        myHeaders.append("Content-Type", "application/json");


        const response = await fetch(Baseurl + '/forgot', {
            method: 'post',
            headers: myHeaders,
            mode: 'cors',

        })
        const data = await response.json()
        if (data.message === "Email incorrect") {
            alert('E-mail Incorreto, Por favor verifique o e-mail digitado')
        }
        if (data.message === "send") {
            const alertEmail = document.querySelector('.send-email')
            alertEmail.style.display = 'initial'
            const divSendEmail = document.querySelector('.forgotPassword')
            divSendEmail.classList.add('alert')

        }
    } catch (error) {
        console.log(error)
    }




}
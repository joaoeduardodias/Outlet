const form = document.getElementById('form-login')
form.onsubmit = function(e) {
    login()
    e.preventDefault()

}
const baseurl = 'http://localhost:3333'


// async function getUsers() {
//     try {
//         const response = await fetch("http://localhost:3333/users");
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(error);
//     }
// }

async function login() {
    try {
        const { value: email } = document.getElementById("input-email");
        const { value: password } = document.getElementById("input-password");


        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(email + ":" + password))
        headers.append('Content-Type', 'application/json')

        const response = await fetch(baseurl + '/login', {
            method: 'post',
            headers: headers
        })
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(errou)
        console.error(error);
    }
}

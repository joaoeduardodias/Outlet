async function getUsers() {
    try {
        const response = await fetch('http://localhost:3333/users')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
async function createUser() {
    try {
        // 			var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "text/plain");
        // myHeaders.append("Content-Length", content.length.toString());
        // myHeaders.append("X-Custom-Header", "ProcessThisImmediately")
        const response = await fetch('http://localhost:3333/users', {
            method: 'post',
            body: new FormData(document.querySelector('#form-login'))
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

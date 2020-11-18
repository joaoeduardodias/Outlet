const BaseUrl = "http://localhost:3333";
let selectState = document.getElementById('state')
let selectCity = document.getElementById('city')
let idState
let IdCity


async function listState() {
    const data = await fetch(BaseUrl + '/liststate', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: 'cors'
    })
    const state = await data.json()

    state.map(item => {
        var el = document.createElement('option')
        el.textContent = item.name
        el.value = item.id
        selectState.appendChild(el)
    })
    return state
}
listState()

function returnValueState() {

    var value = selectState.options[selectState.selectedIndex].value
    idState = value.toString()
    listCity(idState)


}


async function listCity(idState) {
    var length = selectCity.options.length;
    for (i = length - 1; i >= 0; i--) {
        selectCity.options[i] = null;
    }
    const data = await fetch(`${BaseUrl}/listcity/${idState}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: 'cors'
    })
    const city = await data.json()
    city.map(item => {
        var el = document.createElement('option')

        el.textContent = item.name
        el.value = item.id
        selectCity.appendChild(el)
    })
}
// api
async function create(idUser) {
    try {
        const neighborhood = document.getElementById('neighborhood').value
        const street = document.getElementById('street').value
        const number = document.getElementById('number').value
        const selectCity = document.getElementById('city')
        const id_city = selectCity.options[selectCity.selectedIndex].value

        const address = {
            neighborhood,
            name: street,
            number,
            id_city,
            id_users: idUser
        }
        const data = await fetch(BaseUrl + '/address', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(address),
            mode: 'cors'
        })
        location.href = "../../pages/login.html"


    } catch (error) {
        console.log(error)
    }


}

selectState.addEventListener('change', () => {
    selectState.style.color = '#01cA01'
    selectState.style.border = '1px solid #22FA0E'

    returnValueState()

})

selectCity.addEventListener('change', () => {
    selectCity.style.color = '#01cA01'
    selectCity.style.border = '1px solid #22FA0E'
})

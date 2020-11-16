const BaseUrl = "http://localhost:3333";
let selectState = document.getElementById('state')
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

    const data = await fetch(`${BaseUrl}/listcity/${idState}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: 'cors'
    })
    let selectCity = document.getElementById('city')
    const city = await data.json()
    city.map(item => {
        var el = document.createElement('option')
        el.textContent = item.name
        el.value = item.id
        selectCity.appendChild(el)
    })
}

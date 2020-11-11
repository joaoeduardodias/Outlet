async function listState() {
    const data = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados', {
        method: 'GET'
    })
    const state = await data.json()
    return state
}
listState()

let selectState = document.getElementById('state')

for (i = 0; i < selectState.length; i++) {
    console.log(selectState.options[i]);
}
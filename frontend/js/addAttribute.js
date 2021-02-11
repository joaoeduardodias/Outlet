const baseurl = "https://ecomerceoutlet.herokuapp.com";
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
const token = localStorage.getItem("Authorization");



c('#add-attribute').addEventListener('click', async() => {
    const codProduct = document.getElementById('cod-product').value
    const type_attribute = document.getElementById('type-attribute').value
    const option_one = document.getElementById('option-one').value
    const option_two = document.getElementById('option-two').value
    const option_three = document.getElementById('option-three').value
    const option_for = document.getElementById('option-for').value
    const attribute = {
        type_attribute,
        option_one,
        option_two,
        option_three,
        option_for
    }
    const data = await fetch(baseurl + `/attribute/${codProduct}`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        },
        mode: "cors",
        body: JSON.stringify(attribute),
    });

    const value = await data.json();
    if (value.message == `Token invalid.`) {
        location.href = "./login.html";
    }
    if (value.message == "create") {

        const btn = c("#add-attribute");
        setTimeout(() => {
            btn.style.backgroundColor = "#1cca0c";
            btn.innerText = "Atributo Criado";
            setTimeout(() => {
                btn.style.backgroundColor = "#f67600";
                btn.innerText = "Adicionar";
                location.reload();
            }, 1500);
        }, 400);
    }
})

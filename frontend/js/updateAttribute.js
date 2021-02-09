const baseurl = "https://ecomerceoutlet.herokuapp.com";
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

const attributes = cs('.attribute')

attributes.forEach((item) => {

    item.addEventListener('click', () => {
        attributes.forEach(removeSelected)

        function removeSelected(item) {
            item.classList.remove('selected')
        }

        item.classList.toggle('selected')
        c('.update-attribute').style.display = 'initial'
            // limpa os campos ao alterar de tipo de  atributo
        document.getElementById('type-attribute').value = ''
        document.getElementById('option-one').value = ''
        document.getElementById('option-two').value = ''
        document.getElementById('option-three').value = ''
        document.getElementById('option-for').value = ''

    })
})

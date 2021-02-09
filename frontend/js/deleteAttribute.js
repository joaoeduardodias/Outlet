const baseurl = "https://ecomerceoutlet.herokuapp.com";
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

const attributes = cs('.attribute')


attributes.forEach((item) => {
    item.addEventListener('click', () => {
        item.querySelector('span').style.display = 'initial'
        item.querySelector('img').style.display = 'none'
        c('.alert').style.display = 'none'
        c('.alert').style.opacity = 0

        setTimeout(() => {
            item.querySelector('img').style.display = 'initial'
            item.querySelector('span').style.display = 'none'
            item.style.backgroundColor = '#fc3838'
            c('.alert').style.display = 'flex'
            c('.alert').style.opacity = 1

        }, 600)



    })
    item.querySelector('img').addEventListener('click', () => {
        item.style.opacity = 1
        item.style.display = 'flex'

        setTimeout(() => {
            item.style.opacity = 0
            item.style.display = 'none'
        }, 200)

        // chamar a api para deletar

    })

})

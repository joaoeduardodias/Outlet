const baseurl = "https://ecomerceoutlet.herokuapp.com";
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
let show = true;

const btnDow = c('.description img')
btnDow.addEventListener('click', () => {
    const details = c('#details')
    details.style.display = show ? 'initial' : 'none'
    details.classList.toggle("on", show)
    show = !show

    details.addEventListener('animationend', (event) => {
        if (event.animationName === "dow") {
            c('.details .grid').style.display = 'grid'
        }
    })
})

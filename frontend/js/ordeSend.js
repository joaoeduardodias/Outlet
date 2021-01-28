const baseurl = "https://ecomerceoutlet.herokuapp.com";
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);


const btnDown = c('.btn-down')
const btnUp = c('.btn-up')
btnDown.addEventListener('click', () => {

    const details = c('#details')
    details.style.display = 'initial'
    btnDown.style.opacity = 1

    setTimeout(()=>{
      btnDown.style.opacity = 0
      btnDown.style.display = 'none'
      btnUp.style.display = 'flex'
      btnUp.style.opacity = 1



    },300)
    details.addEventListener('animationend', (event) => {
        if (event.animationName === "dow") {
            c('.details .grid').style.display = 'grid'
        }
    })

})

btnUp.addEventListener('click', () =>{
  const details = c('#details')

  btnUp.style.opacity = 1

  setTimeout(()=>{
    btnUp.style.opacity = 0
    btnUp.style.display = 'none'
    btnDown.style.display = 'flex'
    btnDown.style.opacity = 1







  },300)
  details.classList.add('up')
  c('.details .grid').style.display = 'none'
  details.addEventListener('animationend', (event) => {
      if (event.animationName === "up") {
         details.style.display = 'none'
         details.classList.remove('up')


      }
  })
})

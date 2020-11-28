 const button = document.querySelector('#btn-login')
 const buttonclose = document.querySelector('#closediv')
const divemailincorrect = document.querySelector('.valid-email')


function valid(message){
  divemailincorrect.querySelector('p').innerText = message
  divemailincorrect.style.display = 'none'
  divemailincorrect.style.opacity = 0

  setTimeout(()=>{
    divemailincorrect.style.display = 'flex'
    divemailincorrect.style.opacity = 1


  },500)
}
divemailincorrect.addEventListener('animationend', event =>{
  if(event.animationName === "alterbackground"){
    divemailincorrect.classList.add('fill')
    setTimeout(()=>{
    divemailincorrect.style.display = 'none'

    divemailincorrect.classList.remove('fill')

    },800)
  }

})
buttonclose.addEventListener('click', () =>{
  divemailincorrect.classList.add('fill')
  setTimeout(()=>{
    divemailincorrect.style.display = 'none'
  divemailincorrect.classList.remove('fill')

  },800)
})



const baseurl = "http://localhost:3333";
const c = (el) => document.querySelector(el);
const token = localStorage.getItem('Authorization')
let idUser;

 async function getUser() {
  const email = document.getElementById('email').value
   const user = await fetch(`${baseurl}/show/${email}`,{
     method: 'GET',
     headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + token,
     },
     mode: "cors",
   })
   const data =  await user.json()
   if(data.message == 'Token invalid.'){
     location.href = '../pages/login.html'
   }

   if(data.message == 'User not exist'){
     alert('Usuário não cadastrado')
   }
   if(data.id){
    const div = c('.hiddem')
    div.style.display = 'flex'
    document.getElementById('name').innerHTML = data.name
   }
   idUser = data.id

 }

 const btnSearch = c('#Usersearch')
 btnSearch.addEventListener('click',(event)=>{
   getUser()
   event.preventDefault()
 })
async function DeleteUser(){

  const message = await fetch(`${baseurl}/userADM/${idUser}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + token,
    },
    mode: 'cors'
  })
  const data = await message.json()
  if(data.message == 'success'){
    const btn = c('#DeleteUser')
  setTimeout(() => {
   btn.style.backgroundColor = "#1cca0c";
   btn.innerText = "Usuário Deletado";
   setTimeout(() => {
       btn.style.backgroundColor = "#f67600";
       btn.innerText = "Deletar Usuário";

   }, 1900);

   location.reload();

}, 500);
  }


}

c('#DeleteUser').addEventListener('click',(event)=>{
  event.preventDefault()
  DeleteUser()
})

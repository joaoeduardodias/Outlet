const c = (el) => document.querySelector(el)
const cs = (el) => document.querySelectorAll(el);

const images = document.getElementById('image[]')
const btnAdd = c('.images-container label img')


images.addEventListener('change', function() {
	var files = c('input[type=file]').files;



    function readAndPreview(file) {

        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            var reader = new FileReader();

            reader.addEventListener("load", function() {
                const containerImg = c('.images-container')
                const btnAddClone = c('.images-container label')

                const PreviewImg = btnAddClone.cloneNode(true)
                PreviewImg.querySelector('img').src = this.result
                containerImg.appendChild(PreviewImg)



            }, false);

            reader.readAsDataURL(file);
        }

    }

    if (files) {
        [].forEach.call(files, readAndPreview);
    }




})

// conection api

const baseurl = 'http://localhost:3333'
async function create() {
	try {
		const token = localStorage.getItem('Authorization')
				const { value: name } = document.getElementById('name')
        const { value: description } = document.getElementById('description')
        const { value: price } = document.getElementById('price')
				const { value: amount } = document.getElementById('amount')
				const product = {
					name,
					description,
					price,
					amount
				}
		const data = await fetch(baseurl+'/product',{
			method:'Post',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'authorization':'Bearer '+ token
		},
		mode: "cors",
		body: JSON.stringify(product)
		})
		const value = await data.json()
		var form = new FormData()
		form.append('image',document.getElementById('formdata'))
		await fetch(`${baseurl}/upload/${value.id}`,{
			method: 'Post',
			mode: 'cors',
			body: form
		})

		if(value.message == `Token invalid.`){
			location.href = "./login.html"
		}
		if(value.message == `There is already a product with that name`){
			alert('Já existe um produto com esse nome !')
		}
		if(value.message == 'create'){
			const btn = c('.btn-create button')
			setTimeout(()=>{
				btn.style.backgroundColor = '#1cca0c';
				btn.innerText = "Produto Criado"
				setTimeout(()=>{
					btn.style.backgroundColor = '#f67600';
					btn.innerText = "Cadastrar Produto"

					},1500)
			},400)

		}

	} catch (error) {
		console.log(error);
	}
}
c('.btn-create button').addEventListener('click',(e)=>{

	e.preventDefault()
	create()
})

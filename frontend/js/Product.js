const c = (el) => document.querySelector(el)
const cs = (el) => document.querySelectorAll(el);

c('#create').addEventListener('click', () => {
    c('.create-product').style.opacity = 0
    c('.create-product').style.display = 'flex'
    setTimeout(() => {
        c('.create-product').style.opacity = 1

    }, 200)
})
c('#update').addEventListener('click', () => {
    c('.update-product').style.opacity = 0
    c('.update-product').style.display = 'flex'
    setTimeout(() => {
        c('.update-product').style.opacity = 1

    }, 200)
})
c('#delete').addEventListener('click', () => {
    c('.delete-product').style.opacity = 0
    c('.delete-product').style.display = 'flex'
    setTimeout(() => {
        c('.delete-product').style.opacity = 1

    }, 200)
})






const images = document.getElementById('image[]')
const btnAdd = c('.images-container label img')
    // var files = c('input[type=file]').files;

// preview images
// images.addEventListener('change', function() {
// files = c('input[type=file]').files;

// function readAndPreview(file) {


//     // Make sure `file.name` matches our extensions criteria
//     if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
//         var reader = new FileReader();

//         reader.addEventListener("load", function() {
//             const containerImg = c('.images-container')
//             const btnAddClone = c('.images-container label')
//             const PreviewImg = btnAddClone.cloneNode(true)
//             PreviewImg.querySelector('img').src = this.result

//             containerImg.appendChild(PreviewImg)



//         }, false);

//         reader.readAsDataURL(file);
//     }

// }

// if (files) {
//     [].forEach.call(files, readAndPreview);
// }


// })


// conection api

const baseurl = 'http://localhost:3333'
    // create product
    //     async function create() {
    //         try {
    //             const token = localStorage.getItem('Authorization')
    //             const { value: name } = document.getElementById('name')
    //             const { value: description } = document.getElementById('description')
    //             const { value: price } = document.getElementById('price')
    //             const { value: amount } = document.getElementById('amount')
    //             const product = {
    //                 name,
    //                 description,
    //                 price,
    //                 amount
    //             }
    //             const data = await fetch(baseurl + '/product', {
    //                 method: 'Post',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json',
    //                     'Authorization': 'Bearer ' + token
    //                 },
    //                 mode: "cors",
    //                 body: JSON.stringify(product)
    //             })

//         const value = await data.json()

//         const form = new FormData()
//         const images = Array.from(c('input[type=file]').files)
//         images.forEach(image => {
//             form.append('image[]', image)
//         })

//         await fetch(`${baseurl}/upload/${value.id}`, {
//             method: 'Post',
//             mode: "cors",
//             body: form

//         })

//         if (value.message == `Token invalid.`) {
//             location.href = "./login.html"
//         }
//         if (value.message == `There is already a product with that name`) {
//             alert('Já existe um produto com esse nome !')
//         }
//         if (value.message == 'create') {
//             const btn = c('.btn-create button')
//             setTimeout(() => {
//                 btn.style.backgroundColor = '#1cca0c';
//                 btn.innerText = "Produto Criado"
//                 setTimeout(() => {
//                     btn.style.backgroundColor = '#f67600';
//                     btn.innerText = "Cadastrar Produto"
//                     location.reload()

//                 }, 1500)
//             }, 400)

//         }

//     } catch (error) {
//         console.log(error);
//     }
// }
// c('.btn-create button').addEventListener('click', (e) => {

//     e.preventDefault()
//     create()
// })

// UPDATE PRODUCT

let idProduct;
let ImagesPreview = new Array()
let IdPreview = new Array()


async function previewProduct() {


    const { value: nameProduct } = c('#search')
    const product = await fetch(`${baseurl}/show/${nameProduct}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        mode: "cors",
    })
    const data = await product.json()
    if (data.message == "Not existe is product") {
        alert("Nenhum Produto encontrado")
        return;
    }
    const token = localStorage.getItem('Authorization')
    const { id, name, description, amount, available, price, urls, ids } = data
    idProduct = id
    if (urls.split(',') != null) {
        let url = urls.split(',')
        let idImage = ids.split(',')
        ImagesPreview.push(url)
        ImagesPreview.push(idImage)
        ImagesPreview[0].map((item, index) => {

            const containerImg = c('.images-container')
            const btnAddClone = c('.images-container label')
            const PreviewImg = btnAddClone.cloneNode(true)
            PreviewImg.querySelector('img').src = item
            PreviewImg.querySelector('img').id = ImagesPreview[1][index]
            PreviewImg.querySelector('.removeimg').addEventListener('click', async() => {
                try {
                    const id = ImagesPreview[1][index]
                    await fetch(`${baseurl}/upload/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        },
                        mode: "cors"
                    })
                    url.splice(index, 1)
                    PreviewImg.style.opacity = 1
                    setTimeout(() => {
                        PreviewImg.style.opacity = 0
                        PreviewImg.style.display = 'none'
                    }, 200)
                } catch (error) {
                    console.log(error)
                }

            })
            containerImg.appendChild(PreviewImg)
        })

    }


    document.getElementById('name').value = name
    document.getElementById('description').value = description
    document.getElementById('price').value = price
    document.getElementById('amount').value = amount
    if (available == 1) {
        document.getElementById('check').checked = true

    } else {
        document.getElementById('check').checked = false

    }


}

// async function update() {


//     const token = localStorage.getItem('Authorization')
//     const { value: newname } = document.getElementById('name')
//     const { value: newdescription } = document.getElementById('description')
//     const { value: newprice } = document.getElementById('price')
//     const { value: newamount } = document.getElementById('amount')
//     const btnavailable = document.getElementById('check')
//     if (btnavailable.checked == true) {
//         available = 1
//     } else {
//         available = 0

//     }

//     const newProduct = {
//         name: newname,
//         description: newdescription,
//         price: newprice,
//         amount: newamount,
//         available
//     }
//     const data = await fetch(`${baseurl}/product/${idProduct}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         mode: "cors",
//         body: JSON.stringify(newProduct)
//     })
//     const value = await data.json()
//     const form = new FormData()
//     const images = Array.from(c('input[type=file]').files)
//     images.forEach(image => {
//         form.append('image[]', image)
//     })

//     await fetch(`${baseurl}/upload/${idProduct}`, {
//         method: 'Post',
//         mode: "cors",
//         body: form

//     })


//     if (value.message == 'Token invalid.') {
//         location.href = "./login.html"
//     }
//     if (value.message == 'succcess') {
//         const btn = c('.btn-create button')
//         setTimeout(() => {
//             btn.style.backgroundColor = '#1cca0c';
//             btn.innerText = "Produto Atualizado"
//             setTimeout(() => {
//                 btn.style.backgroundColor = '#f67600';
//                 btn.innerText = "Atualizar Produto"

//             }, 1500)
//         }, 400)
//     }


// }

// c('#btn-search-update').addEventListener('click', () => {
//         previewProduct()
//     })
// c('#btn-update').addEventListener('click', (e) => {
//     e.preventDefault()
//     update()
// })

async function previewDelete() {

    const { value: nameProduct } = c('#search')
    const product = await fetch(`${baseurl}/show/${nameProduct}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        mode: "cors",
    })
    const data = await product.json()
    console.log(data)
    if (data.message == "Not existe is product") {
        alert("Nenhum Produto encontrado")
        return;
    }
    const token = localStorage.getItem('Authorization')
    const { name, urls } = data
    const url = urls.split(',')
    c('.product img').src = url[0]
    c('.product-title p').innerHTML = name
    c('.products').style.opacity = 0
    c('.btn-delete').style.opacity = 0
    setTimeout(() => {
        c('.products').style.opacity = 1
        c('.products').style.display = 'flex'
        c('.btn-delete').style.opacity = 1
        c('.btn-delete').style.display = 'flex'
    }, 200)
}


async function Delete() {

}

c('#btn-search-delete').addEventListener('click', () => {
    previewDelete()
})
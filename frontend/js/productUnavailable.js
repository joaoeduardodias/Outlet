const baseurl = "https://ecomerceoutlet.herokuapp.com";
const c = (el) => document.querySelector(el);
const token = localStorage.getItem('Authorization')

async function list() {
    const data = await fetch(`${baseurl}/products`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        mode: 'cors',

    })
    const products = await data.json()
    products.map(item => {
        // clone a div
        const productItem = c('.model .product-list-unavailable').cloneNode(true)
        productItem.querySelector('.id-product').innerHTML = item.id
        productItem.querySelector('.product-name').innerHTML = item.name
        c('.products-unavailable').append(productItem)
    })
}
list()

const baseurl = "https://ecomerceoutlet.herokuapp.com";
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
const images = document.getElementById("image[]");
const btnAdd = c(".images-container label img");

async function previewDelete() {
    const { value: idProduct } = c("#search");
    const product = await fetch(`${baseurl}/Productshow/${idProduct}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        mode: "cors",
    });
    const data = await product.json();
    if (data.message == "Not existe is product") {
        alert("Nenhum Produto encontrado");
        return;
    }

    const { name, urls } = data;
    const url = urls.split(",");
    c(".product img").src = url[0];
    c(".product-title p").innerHTML = name;
    c(".products").style.opacity = 0;
    c(".btn-delete").style.opacity = 0;
    setTimeout(() => {
        c(".products").style.opacity = 1;
        c(".products").style.display = "flex";
        c(".btn-delete").style.opacity = 1;
        c(".btn-delete").style.display = "flex";
    }, 200);
}

c("#btn-search-delete").addEventListener("click", () => {
    previewDelete();
});

async function Delete() {
    try {
        const token = localStorage.getItem("Authorization");
        const { value: id } = c("#search");
        const value = await fetch(`${baseurl}/product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            },
            mode: "cors",
        });

        const data = await value.json();

        if (data.message == "No token provided.") {
            location.href = "./login.html";
        }
        if (data.message == `Token invalid.`) {
            location.href = "./login.html";
        }
        if (data.message == "success") {
            c(".products").style.opacity = 1;
            c(".products").style.display = "flex";
            c(".btn-delete").style.opacity = 1;
            c(".btn-delete").style.display = "flex";
            setTimeout(() => {
                c(".products").style.opacity = 0;
                c(".products").style.display = "none";
                c(".btn-delete").style.opacity = 0;
                c(".btn-delete").style.display = "none";
            }, 300);
        }
    } catch (error) {
        alert("erro encontrado, tente novamente!");

    }
}

c("#btn-delete").addEventListener("click", () => {
    Delete();
});
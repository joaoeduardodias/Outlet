const baseurl = "https://ecomerceoutlet.herokuapp.com";
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
const images = document.getElementById("image[]");
const btnAdd = c(".images-container label img");
let idProduct;
let ImagesPreview = new Array();
let IdPreview = new Array();
let available;

images.addEventListener("change", function() {
    files = c("input[type=file]").files;

    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            var reader = new FileReader();

            reader.addEventListener(
                "load",
                function() {
                    const containerImg = c(".images-container");
                    const btnAddClone = c(".images-container label");
                    const PreviewImg = btnAddClone.cloneNode(true);
                    PreviewImg.querySelector("img").src = this.result;

                    containerImg.appendChild(PreviewImg);
                },
                false
            );

            reader.readAsDataURL(file);
        }
    }

    if (files) {
        [].forEach.call(files, readAndPreview);
    }
});

async function previewProduct() {
    const { value: idsearch } = c("#search");
    const product = await fetch(`${baseurl}/Productshow/${idsearch}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        mode: "cors",
    });
    const data = await product.json();
    if (data.message == "Not existe is product") {
        alert("Nenhum Produto encontrado");
        return;
    }
    const token = localStorage.getItem("Authorization");
    const { id, name, description, amount, available, price, urls, ids, weight, typeWeight, lenght, width, height } = data;
    idProduct = id;
    if (urls.split(",") != null) {
        let url = urls.split(",");
        let idImage = ids.split(",");
        ImagesPreview.push(url);
        ImagesPreview.push(idImage);
        ImagesPreview[0].map((item, index) => {
            const containerImg = c(".images-container");
            const btnAddClone = c(".images-container label");
            const PreviewImg = btnAddClone.cloneNode(true);
            PreviewImg.querySelector("img").src = item;
            PreviewImg.querySelector("img").id = ImagesPreview[1][index];
            PreviewImg.querySelector(".removeimg").addEventListener(
                "click",
                async() => {
                    try {
                        const id = ImagesPreview[1][index];
                        await fetch(`${baseurl}/upload/${id}`, {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer " + token,
                            },
                            mode: "cors",
                        });
                        url.splice(index, 1);
                        PreviewImg.style.opacity = 1;
                        setTimeout(() => {
                            PreviewImg.style.opacity = 0;
                            PreviewImg.style.display = "none";
                        }, 200);
                    } catch (error) {
                        console.log(error);
                    }
                }
            );
            containerImg.appendChild(PreviewImg);
        });
    }

    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
    document.getElementById("price").value = price;
    document.getElementById("amount").value = amount;
    document.getElementById('weight').value = weight
    document.getElementById('type_weight').value = typeWeight
    document.getElementById('length').value = lenght
    document.getElementById('width').value = width
    document.getElementById('height').value = height
    if (available == 1) {
        document.getElementById("check").checked = true;
    } else {
        document.getElementById("check").checked = false;
    }
}

c("#btn-search-update").addEventListener("click", () => {
    previewProduct();
});

async function update() {
    const token = localStorage.getItem("Authorization");
    const { value: newname } = document.getElementById("name");
    const { value: newdescription } = document.getElementById("description");
    const { value: newprice } = document.getElementById("price");
    const { value: newamount } = document.getElementById("amount");
    const newWeight = document.getElementById('weight').value
    const newTypeWeight = document.getElementById('type_weight').value
    const newLenght = document.getElementById('length').value
    const newWidth = document.getElementById('width').value
    const newHeight = document.getElementById('height').value
    const btnavailable = document.getElementById("check");
    if (btnavailable.checked == true) {
        available = 1;
    } else {
        available = 0;
    }

    const newProduct = {
        name: newname,
        description: newdescription,
        price: newprice,
        amount: newamount,
        available,
        weight: newWeight,
        typeWeight: newTypeWeight,
        lenght: newLenght,
        width: newWidth,
        height: newHeight

    };
    const data = await fetch(`${baseurl}/product/${idProduct}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        },
        mode: "cors",
        body: JSON.stringify(newProduct),
    });
    const value = await data.json();
    const form = new FormData();
    const images = Array.from(c("input[type=file]").files);
    images.forEach((image) => {
        form.append("image[]", image);
    });


    await fetch(`${baseurl}/upload/${idProduct}`, {
        method: "Post",
        mode: "cors",
        body: form,
    });

    if (value.message == "Token invalid.") {
        location.href = "./login.html";
    }
    if (value.message == "succcess") {
        const btn = c(".btn-create button");
        setTimeout(() => {
            btn.style.backgroundColor = "#1cca0c";
            btn.innerText = "Produto Atualizado";
            setTimeout(() => {
                btn.style.backgroundColor = "#f67600";
                btn.innerText = "Atualizar Produto";
            }, 1500);
        }, 400);
    }
}

c("#btn-update").addEventListener("click", (e) => {
    e.preventDefault();
    update();
});

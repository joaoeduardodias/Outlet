const baseurl = "https://ecomerceoutlet.herokuapp.com";
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
const images = document.getElementById("image[]");
const btnAdd = c(".images-container label img");
const formCreate = c("#form-data");
formCreate.onsubmit = function(e) {
    e.preventDefault();

    create()

};

// preview images
images.addEventListener("change", function() {
    files = c("input[type=file]").files;

    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            var reader = new FileReader();


            if (file.size > 3145728) {
                // 3145728 = 3mb
                alert("imagem maior que o tamanho permitido")

            } else {
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
    }

    if (files) {
        [].forEach.call(files, readAndPreview);
    }
});


async function create() {
    try {
        const token = localStorage.getItem("Authorization");

      const formData = new FormData(formCreate)
      const images = Array.from(c("input[type=file]").files);
      images.forEach((image) => {
          formCreate.append("image[]", image);
        });
        const data = await fetch(baseurl + "/product", {
            method: "Post",
            headers: {

                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            },
            mode: "cors",
            body: formData,
        });

        const value = await data.json();
        console.log(value);



        // const form = new FormData();
        // const images = Array.from(c("input[type=file]").files);
        // images.forEach((image) => {
        //     form.append("image[]", image);
        // });

        // await fetch(`${baseurl}/upload/${value.id}`, {
        //     method: "Post",
        //     mode: "cors",
        //     body: form,
        // });


        if (value.message == `Token invalid.`) {
            location.href = "./login.html";
        }
        if(value.message == "value missing body") {
          alert("Erro encontrado, por favor verifique se todos os campos estão corretos")
        }
        if (value.message == `There is already a product with that name`) {
            alert("Já existe um produto com esse nome !");
        }
        if (value.message == "create") {

            const btn = c(".btn-create button");
            setTimeout(() => {
                btn.style.backgroundColor = "#1cca0c";
                btn.innerText = "Produto Criado";
                setTimeout(() => {
                    btn.style.backgroundColor = "#f67600";
                    btn.innerText = "Cadastrar Produto";
                    // location.reload();
                }, 1500);
            }, 400);
        }
    } catch (error) {
        console.log(error);
    }
}
// c(".btn-create button").addEventListener("click", (e) => {
//     e.preventDefault();
//     create();
// });

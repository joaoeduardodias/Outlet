const c = (el) => document.querySelector(el)
const cs = (el) => document.querySelectorAll(el);

const images = document.getElementById('image[]')
const btnAdd = c('.images-container label img')
const preview = c('#preview')
    // create preview image
    // notclickimages.addEventListener('change', (e) => {})
images.addEventListener('change', function() {
    // const selectedImages = Array.from(this.files)
    // console.log(selectedImages)

    var files = c('input[type=file]').files;

    function readAndPreview(file) {

        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            var reader = new FileReader();

            reader.addEventListener("load", function() {
                const containerImg = c('.images-container')
                const btnAddClone = c('.images-container label')

                const PreviewImg = btnAddClone.cloneNode(true)
                // PreviewImg.querySelector('img').src = this.result
                containerImg.appendChild(PreviewImg)


                // var image = new Image();
                // image.height = 100;
                // image.title = file.name;
                // image.src = this.result;
                // preview.appendChild(image);
            }, false);

            reader.readAsDataURL(file);
        }

    }

    if (files) {
        [].forEach.call(files, readAndPreview);
    }




})

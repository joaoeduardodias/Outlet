const baseurl = "https://ecomerceoutlet.herokuapp.com";
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
const form = c("form");
form.onsubmit = function(e) {
    // resetPassword();
    e.preventDefault();
};


const password = document.getElementById('input-password').value
const chekPassword = document.getElementById('input-check_password').value


const fields = cs('[required]')






function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for (let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            password: {
                valueMissing: "Por favor, preencha este campo"
            },

        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")
        const password = document.getElementById('input-password').value
        const chekPassword = document.getElementById('input-check_password').value
        if (chekPassword) {
            if (password != chekPassword) {

                field.style.borderColor = "red"
                spanError.classList.add("active")
                spanError.style.display = 'flex'
                spanError.innerHTML = "As senhas não correspondem"
            } else {
                field.style.borderColor = "green"
                spanError.classList.remove("active")
                spanError.style.display = 'none'
                spanError.innerHTML = ""
            }
        } else if (message) {
            spanError.classList.add("active")
            spanError.style.display = 'flex'
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.style.display = 'none'
            spanError.innerHTML = ""
        }
    }

    return function() {

        const error = verifyErrors()

        if (error) {
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "green"
            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const field = event.target



    const validation = ValidateField(field)

    validation()

}

for (field of fields) {
    field.addEventListener("invalid", event => {
        // eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
    field.addEventListener("keyup", customValidation)
}
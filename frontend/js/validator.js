const fields = document.querySelectorAll("[required]")

function customValidation(event) {
    const field = event.target
        // trocar msg de required
    field.setCustomValidity('Preencha esse campo')
}


for (field of fields) {
    field.addEventListener('invalid', customValidation)
}

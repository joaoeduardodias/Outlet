var stripe = Stripe(
    "pk_test_51I722hG3We8Vf5Y0ezP9rD5SKboSUgJRImKQ2LiBSpMCss1i7vSz4nKvCuietZYXmDcdC5qRS5jIN3DFkVmJRxeP00NZo4o97S"
);

const tokenUser = localStorage.getItem("Authorization");
const zip_code = localStorage.getItem("Zip_code");
const dataUser = JSON.parse(atob(tokenUser.split(".")[1]));
let valueTotal;

var purchase = {};
document.getElementById("email").value = dataUser.email;

async function setPriceFreight() {

    const product = await fetch(`${baseurl}/Productshow/${idProduct}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        mode: "cors",
    })
    const resProduct = await product.json()

    let Freight = {
        weight: resProduct.weight,
        zip_code,
        lenght: resProduct.lenght,
        width: resProduct.width,
        height: resProduct.height,
        methodFreight: "PAC",
    };


    const DataFreight = await fetch(`${baseurl}/freight`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify(Freight),
    });

    const DataFreightJson = await DataFreight.json();

    const valorFreight = DataFreightJson.Valor.replace(",", ".");
    const valorFreightFormat = parseFloat(valorFreight);
    document.getElementById("price_freight").innerText = `Frete: ${valorFreight}`;
    document.getElementById("date_freight")
        .innerText = `Prazo de entrega de ${DataFreightJson.PrazoEntrega} dias`;
    const priceTotalFormat = parseFloat(priceTotal);
    valueTotal = priceTotalFormat + valorFreightFormat;

    // items que o usuario deseja comprar
    purchase = {
        items: {
            id: idProduct,
            price: valueTotal,
            amount_sold: qtd
        },
    };
    // desative o botao de pagamento até carregar o stripe
    document.querySelector("button").disabled = true;
    fetch(`${baseurl}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(purchase),
        })
        .then(function(result) {
            return result.json();
        })
        .then(function(data) {
            var elements = stripe.elements();

            var style = {
                base: {
                    color: "#32325d",
                    fontFamily: "Arial, sans-serif",
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#32325d",
                    },
                },
                invalid: {
                    fontFamily: "Arial, sans-serif",
                    color: "#fa755a",
                    iconColor: "#fa755a",
                },
            };

            var card = elements.create("card", { style: style });
            // Stripe injects an iframe into the DOM
            card.mount("#card-element");
            card.on("change", function(event) {
                // Disable the Pay button if there are no card details in the Element
                document.querySelector("button").disabled = event.empty;
                document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
            });

            var form = document.getElementById("payment-form");
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                // Complete payment when the submit button is clicked
                payWithCard(stripe, card, data.clientSecret);
            });
        });

    cc(".purchase-modal .price-total").innerHTML = `Total R$: ${valueTotal.toFixed(2)}`;
}






// Show a spinner on payment submission
var loading = function(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("button").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("button").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
};


var payWithCard = function(stripe, card, clientSecret) {
    loading(true);
    stripe
        .confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
            },
        })
        .then(function(result) {
            if (result.error) {
                // Show error to your customer
                showError(result.error.message);
            } else {
                // The payment succeeded!
                // orderComplete(result.paymentIntent.id);
                removeCartPay(Index)
                orderComplete();
                const prodSold = {
                    amount_sold: purchase.items.amount_sold,
                    value_total: purchase.items.price
                }
                async function soldProduct() {
                    await fetch(`${baseurl}/product_sold/${purchase.items.id}`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": "Bearer " + tokenUser,
                        },
                        body: JSON.stringify(prodSold),
                        mode: 'cors'
                    })
                }
                soldProduct()
            }
        });
};
var orderComplete = function() {
    loading(false);
    document
        .querySelector(".result-message a")
        .setAttribute(
            "href",
            "https://artesanatosoutletmultimarcas.com/"
        );
    document.querySelector(".result-message").classList.remove("hidden");
    document.querySelector("button").disabled = true;
};
// Show the customer the error from Stripe if their card fails to charge
var showError = function(errorMsgText) {
    loading(false);
    var errorMsg = document.querySelector("#card-error");
    errorMsg.textContent = errorMsgText;
    setTimeout(function() {
        errorMsg.textContent = "";
    }, 4000);
};

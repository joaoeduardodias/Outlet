window.Mercadopago.setPublishableKey("TEST-51f8db06-c035-4c78-a0d1-0e67fc404294");
window.Mercadopago.getIdentificationTypes();
const tokenUser = localStorage.getItem('Authorization')
    // const zip_code = localStorage.getItem('Zip_code')
const dataUser = JSON.parse(atob(tokenUser.split(".")[1]));
document.getElementById('email').value = dataUser.email
let Freight = {
    weight,
    zip_code: 79500000,
    lenght,
    width,
    height,
    methodFreight: 'PAC'
}
async function setPriceFreight() {
    const DataFreight = await fetch(`${baseurl}/freight`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify(Freight)
    })
    const DataFreightJson = await DataFreight.json()
    console.log(DataFreightJson)
    document.getElementById('price_freight').innerText = `Valor do Frete: ${DataFreightJson.Valor.replace(',' ,'.')}`

    valueTotal = priceTotal + DataFreightJson.Valor
    cc(".purchase-modal .price-total").innerHTML = `Valor Total - R$: ${valueTotal}`
}



document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);

function guessPaymentMethod(event) {
    let cardnumber = document.getElementById("cardNumber").value;
    if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0, 6);
        window.Mercadopago.getPaymentMethod({
            "bin": bin
        }, setPaymentMethod);
    }
};

function setPaymentMethod(status, response) {
    if (status == 200) {
        let paymentMethod = response[0];
        document.getElementById('paymentMethodId').value = paymentMethod.id;

        getIssuers(paymentMethod.id);
    } else {
        alert(`payment method info error: ${response}`);
    }
}

function getIssuers(paymentMethodId) {
    window.Mercadopago.getIssuers(
        paymentMethodId,
        setIssuers
    );
}

function setIssuers(status, response) {
    if (status == 200) {
        let issuerSelect = document.getElementById('issuer');
        response.forEach(issuer => {
            let opt = document.createElement('option');
            opt.text = issuer.name;
            opt.value = issuer.id;
            issuerSelect.appendChild(opt);
        });

        getInstallments(
            document.getElementById('paymentMethodId').value,
            document.getElementById('transactionAmount').value = valueTotal,
            issuerSelect.value
        );
    } else {
        alert(`issuers method info error: ${response}`);
    }
}

function getInstallments(paymentMethodId, transactionAmount, issuerId) {
    window.Mercadopago.getInstallments({
        "payment_method_id": paymentMethodId,
        "amount": parseFloat(transactionAmount),
        "issuer_id": parseInt(issuerId)
    }, setInstallments);
}

function setInstallments(status, response) {
    if (status == 200) {
        document.getElementById('installments').options.length = 0;
        response[0].payer_costs.forEach(payerCost => {
            let opt = document.createElement('option');
            opt.text = payerCost.recommended_message;
            opt.value = payerCost.installments;
            document.getElementById('installments').appendChild(opt);
        });
    } else {
        alert(`installments method info error: ${response}`);
    }
}

// gerando o token do cartao

let doSubmit = false;
document.getElementById('paymentForm').addEventListener('submit', getCardToken);

function getCardToken(event) {
    event.preventDefault();
    if (!doSubmit) {
        let $form = document.getElementById('paymentForm');
        window.Mercadopago.createToken($form, setCardTokenAndPay);
        return false;
    }
};

async function setCardTokenAndPay(status, response) {
    if (status == 200 || status == 201) {
        let form = document.getElementById('paymentForm');
        let card = document.createElement('input');
        card.setAttribute('name', 'token');
        card.setAttribute('type', 'hidden');
        card.setAttribute('value', response.id);
        form.appendChild(card);



        const token = response.id
        const description = document.getElementById('description').value
        const installments = document.getElementById('installments').value
        const payment_method_id = document.getElementById('paymentMethodId').value
        const issuer_id = document.getElementById('issuer').value
        const email = document.getElementById('email').value
        const docType = document.getElementById('docType').value
        const docNumber = document.getElementById('docNumber').value
        const Payment = {
            transaction_amount: valueTotal,
            token,
            description,
            installments,
            payment_method_id,
            issuer_id,
            email,
            docType,
            docNumber
        }
        const Response = await fetch(baseurl + '/process_payment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            mode: 'cors',
            body: JSON.stringify(Payment)
        })
        const data = await Response.json()

        const Product_Sold = {
            value_total: valueTotal,
            amount_sold: qtd,
        }


        switch (data.status_detail) {
            case 'accredited':
                alert(`Pronto, seu pagamento foi aprovado! `)
                await fetch(`${baseurl}/product_sold/${idProduct}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + tokenUser,
                    },
                    mode: 'cors',
                    body: JSON.stringify(Product_Sold)

                })
                removeCart(Index)
                break;
            case 'pending_contingency':
                alert(`Estamos processando o pagamento.
                    Não se preocupe, em menos de 2 dias úteis
                    informaremos por e-mail se foi creditado.`)
                break;
            case 'pending_review_manual':
                alert(`Estamos processando seu pagamento.
                    Não se preocupe, em menos de 2 dias úteis
                    informaremos por e-mail se foi creditado ou se necessitamos de mais informação.`)
                break;
            case 'cc_rejected_bad_filled_card_number':
                alert('Revise o número do cartão.')
                break;
            case 'cc_rejected_bad_filled_date':
                alert('Revise a data de vencimento.')
                break;
            case 'cc_rejected_bad_filled_other':
                alert('Revise os dados.')
                break;
            case 'cc_rejected_bad_filled_security_code':
                alert('Revise o código de segurança do cartão.')
                break;
            case 'cc_rejected_card_error':
                alert('Não conseguimos processar seu pagamento.')
                break;
            case 'cc_rejected_insufficient_amount':
                alert('Saldo insuficiente')
                break;
            case 'cc_rejected_max_attempts':
                alert('Você atingiu o limite de tentativas permitido.Escolha outro cartão ou outra forma de pagamento.')
                break;

        }


    } else {
        alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
    }
};

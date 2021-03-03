const dataUser = JSON.parse(atob(tokenUser.split(".")[1]));

// // document.getElementById("email").value = dataUser.email;

// async function setPriceFreight() {

//     const product = await fetch(`${baseurl}/Productshow/${idProduct}`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//         },
//         mode: "cors",
//     })
//     const resProduct = await product.json()
//     let Weight = resProduct.weight * qtd

//     let Freight = {
//         weight: Weight,
//         zip_code,
//         lenght: resProduct.lenght,
//         width: resProduct.width,
//         height: resProduct.height,
//         methodFreight: "PAC",
//     };

//     const DataFreight = await fetch(`${baseurl}/freight`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//         },
//         mode: "cors",
//         body: JSON.stringify(Freight),
//     });

//     const DataFreightJson = await DataFreight.json();

//     const valorFreight = DataFreightJson.Valor.replace(",", ".");
//     const valorFreightFormat = parseFloat(valorFreight);
//     document.getElementById("price_freight").innerText = `Frete: ${valorFreight}`;
//     document.getElementById("date_freight").innerText = `Prazo de entrega de ${DataFreightJson.PrazoEntrega} dias`;
//     const priceTotalFormat = parseFloat(priceTotal);
//     valueTotal = priceTotalFormat + valorFreightFormat;

//     // items que o usuario deseja comprar
//     purchase = {
//         items: {
//             id: idProduct,
//             price: valueTotal,
//             amount_sold: qtd,
//             attribute_one,
//             attribute_two,

//         },
//     };

//     cc(".purchase-modal .price-total").innerHTML = `Total R$: ${valueTotal.toFixed(2)}`;

// }
// cc(".purchase-modal #pay").addEventListener('click', async(e) => {
//     e.preventDefault()
//     console.log(purchase)
//         // const resp = await fetch(`${baseurl}/buy`, {
//         //     method: "POST",
//         //     headers: {
//         //         "Content-Type": "application/json",
//         //         "Accept": "application/json",
//         //     },
//         //     mode: "cors",
//         //     body: JSON.stringify(purchase)
//         // })

//     // const resJson = await resp.json()
//     // console.log(resJson)

// })

// // ASSIM QUE O GATEWAY DE PAGAMENTO AUTORIZAR A COMPRA, CHAMAR A API QUE GISTRA A VENDA DO PRODUTO

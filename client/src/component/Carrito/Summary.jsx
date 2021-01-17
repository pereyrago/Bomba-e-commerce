import React from 'react'


export default function Summary ({data}) {

    var subTotal= data.reduce && data.reduce(
        (acc, element)=> acc+=element.line.price
        , 0 )
    var impuestos= 0.21

    //ejemplo con map data && data.map(i=> subtotal=subtotal+i.line.price)


    return (
        <div>
            <p> Subtotal:$ {subTotal && subTotal} </p>
            <p> Envío: GRATIS </p>
            <p> IVA 21%: $ {subTotal && (subTotal && subTotal * impuestos).toFixed(2)} </p>
            <p> TOTAL: $ {subTotal && (subTotal && subTotal + subTotal * impuestos).toFixed(2)} </p>
        </div>
    )
}


import React from 'react'
import { connect } from 'react-redux';



function Carrito ({}){

    return (
        <div>
            <h2> carrito </h2>

    {products.map(prod => <div>
                    <div>Producto: {prod.name}</div>
                    <div>Unidades: {cantidad}</div> 
                    <div>Precio: {prod.price * cantidad}</div>
                    </div>)}

        </div>


    )

}

export default connect()(Carrito)
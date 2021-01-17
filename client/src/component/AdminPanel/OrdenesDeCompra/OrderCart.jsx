import React, { useState, useEffect } from "react";
import authAxios from '../../../axios'
import jwt from 'jwt-simple'
import s from '../../../styles/OrderCart.module.css'


function OrderCart({ data, delCart }) {


  var suma = 0;
  function sumar(b) {
    return suma = (suma + b);
  }
  useEffect(() => {

  }, [data])

  return (

    <>
      {data ?
        <div  onClick={() => delCart()} className={s.container} >
          <div className={s.tablaCont}>
            <div className= {s.botonContainer}>
              <p className={s.parrafo} >Orden #{data[0] && data[0].line.cartId}</p>
              <button className={s.btn} onClick={() => delCart()}>x</button>
            </div>
            <table className={s.tabla}>
              <thead>
                <tr className={s.fila} >
                  <th>Nombre</th>
                  <th>Unidades</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              {data[0] ? data.map((info) => (
                <>
                  <tbody>
                    <tr>
                      <td>{info.product.name}</td>
                      <td>{info.line.quantity}</td>
                      <td>{info.product.price}</td>
                      <td suma={sumar(info.line.price)}>${info.line.price}</td>
                    </tr>
                  </tbody>

                </>
              )) : (
                  <a className={s.empty}>No hay productos cargado en este carrito</a>
                )}
              <tr>
                <td>IVA (21%) </td>
                <td></td>
                <td></td>
                <td>${(suma * 0.21).toFixed(2)}</td>
              </tr>
              <tfoot>
                <tr className= {s.total}>
                  <td>TOTAL + IVA </td>
                  <td></td>
                  <td></td>
                  <td>${(suma + (suma * 0.21)).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div> : null}
    </>
  );
}





export default OrderCart;
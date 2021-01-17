import React, { useState, useEffect } from "react";
import authAxios from '../axios'
import jwt from "jwt-simple";

function Order() {
  const [data, setData] = useState("");

  let email;
  let userId;
  if (localStorage.getItem("token"))
    var decoded = jwt.decode(
      localStorage.getItem("token"),
      "ecommerce-ft06-g07"
    );
  if (decoded) {
    email = decoded.user.email;
    userId = decoded.user.id;
  }

  useEffect(() => {
   
    authAxios.get('cart/users/' + userId)
      .then(ans => setData(ans.data))
   
  }, [])

  var suma=0;
  function sumar(b){
    return suma=suma + b;
  }

  return (
    <>
      <p>Orden número {data && data[0].line.cartId}  del usuario {userId}</p> 
      <table className="table table-bordered">
        <thead>
              <tr> 
                <th>Nombre</th>
                <th>Unidades</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
      </thead>
        {data ? data.map((info) => (
          
          <>
            
              <tbody>
                  <tr>        
                    <td> {info.product.name} </td>
                    <td>{info.line.quantity}</td>
                    <td>{info.product.price}</td>
                    <td suma={sumar(info.line.price)}>${info.line.price}</td>
                  </tr>
              </tbody>
      
          </>
      )) : (
      <h1>No tenés ningun carrito cargado</h1>
      )}
        <tfoot>
          <tr>
          <td>TOTAL</td>
          <td></td>
          <td></td>
          <td>${suma}</td>
          </tr>
        </tfoot>          
      </table>
    </>
  );
}


export default Order;

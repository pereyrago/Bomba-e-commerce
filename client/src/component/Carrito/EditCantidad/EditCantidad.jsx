import React, {useState} from 'react';
import jwt from 'jwt-simple';
import swal from 'sweetalert';
import s from "../../../styles/Carrito.module.css";
import authAxios from '../../../axios'
import {getNumProducts} from '../../../store/actions/index';
import {connect} from 'react-redux'
import { useEffect } from 'react';

let stock1;

function EditCantidad(props) {


    let userId;
    stock1 = props.stock;
    const [input, setInput] = useState(props.quantity)
    const [error, setError] = useState("")
    const {price, productId, setFlag, flag, getNumProducts} = props

    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
    if(decoded){
     userId= decoded.user.id}



    function handleChange(e){
        e.preventDefault()
        setInput(e.target.value)
        setError( validate(e.target.value));  
  
      }

      function editarCantidad() {
        authAxios.put('cart/users/' + userId, {price, quantity: input, productId})
          .then(ans => {
              setFlag(!flag);
              swal("¡Listo!", "La cantidad ha sido modificada", "success")
            }) .catch(()=>()=>swal("Ups!","No se pudo modificar la cantidad","error"))
    }
      

      function eliminarProducto() {
        authAxios.delete('cart/users/' + userId + "/" + productId)
        .then(ans => {
            getNumProducts(userId);
            setFlag(!flag); 
            swal("¡Listo!", "El producto ha sido eliminado", "success");
            
        }).catch(()=>()=>swal("Ups!","No se pudo eliminar el producto","error"))
    }

    /*useEffect(()=>{
      getNumProducts(userId);
    },[flag])*/

    return(
      <>
        <div className={s.org}>
            <input type = "number" onChange = {handleChange} value = {input} min="1" max={props.stock}/>
            {error ? <p className={s.errores}>{error}</p> : null}

            <p className={s.precio}> Stock : {props.stock}</p>
            </div>
            <div>
            <div>
              <button className={s.button1} onClick = {editarCantidad}> Confirmar </button>
              <button className={s.button1} onClick = {eliminarProducto}> Eliminar </button>
              </div>
        </div>
      </>
    )
}

export function validate(cantidad) {
    
    let err = ''
    if (cantidad <= 0 )  {
        err = 'la cantidad ingresada es invalida'     
    }
    if(cantidad > stock1){
      err = 'la cantidad ingresada es mayor al stock' 
    }
    
    return err
 }


 export default connect(null,{getNumProducts})(EditCantidad);
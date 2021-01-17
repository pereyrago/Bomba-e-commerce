import React, {useState} from 'react';
import s from "./../../../styles/ProductCard.module.css";
import {Link} from "react-router-dom";
import {connect, useSelector, useDispatch} from 'react-redux';
import {setProductInfo, ratePromedio, verReview, getNumProducts} from '../../../store/actions/index';
import authAxios from '../../../axios'
import jwt from 'jwt-simple';
import Swal from 'sweetalert2';

function ProductCard({setProductInfo, id, name, price, stock , images, ratePromedio, verReview, getNumProducts }) {

    let[cantidad, setCantidad] = useState(1);
    let email;
    let userId;
    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
     if(decoded){  
      email = decoded.user.email
      userId= decoded.user.id}      
      //SweetAlert  popUp config
      const Toast = Swal.mixin({
        toast: true,
        //center, top-start/end, bottom-start/end
        position: 'top-end',
        //boton de confirmacion
        showConfirmButton: false,        
        timer: 1500,
        //barra que muestra tiempo faltante
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      let handleSubmit = () =>{
        if(!email){
          authAxios.post('cart/addProduct', {email: '', quantity: cantidad, id, price})
          .then(res=>{
            localStorage.setItem('token', res.data)
          
          })
        }else{
          authAxios.post('cart/addProduct', {userId, email, quantity: cantidad, id, price})
          .then(()=>{
            getNumProducts(userId)
          })
          .catch(()=>Toast.fire({
            icon: 'error',
            title: 'No se pudo agregar al carrito'
          }))
        }
      }
      
      
    

    return (
        <main className={s.main}>
            <div className={s.product}>
                    <div className={s.circulo}>                   
                        <img key={images[0].id} className={s.imagen} src={images[0] ? `http://localhost:3001${images[0].imgUrl}` :null} alt='sin imagen'/>
                        
                    </div>
                    <div className={s.info}>
                    <h2 className= {s.titulo}>{name}</h2>
                    <p className= {s.precio}> ${price} </p>
                  {
                    stock < 1 ? 
                    <div>
                        
                        <button className={s.botonDisabled} disabled > Agregar al Carrito </button> <p className={s.sinStock}>SIN STOCK</p>
                    </div>
                        :
                    <button className={s.botonText} onClick={()=>handleSubmit()}> Agregar al Carrito </button>
                  }
                    <Link to="/products/" onClick={()=> (ratePromedio(id), setProductInfo(id), verReview(id))}><button className={s.botonText}> ver producto</button></Link>              
                    </div>

            </div>
        </main>
    )
};

export default connect(null,{setProductInfo, ratePromedio, verReview, getNumProducts})(ProductCard);


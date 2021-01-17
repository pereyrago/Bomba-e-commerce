import React, {useState,Helmet} from "react";
import Summary from "../Carrito/Summary"
import authAxios from '../../axios'
import { useEffect } from "react";
import {Link, Redirect} from 'react-router-dom';
import jwt from 'jwt-simple'
import d from "../../styles/Checkout.module.css"
import s from "./../../styles/Carrito.module.css"

const Checkout= () =>{
 
    const[flagPago, setFlagPago] = useState('');
    const[data, setData] = useState('');
    
    let userId
    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
         if(decoded){
          userId= decoded.user.id}


    useEffect(()=>{
        authAxios.get('cart/users/' + userId) 
        .then(ans => setData(ans.data))
        .catch(err=> console.log(err))
    
    },[])

    useEffect(()=>{ 
    },[flagPago])
    

    const mercadoPago = () => {
        authAxios.post('checkout/payment/new',{articles: data })
        .then((ans)=> setFlagPago(ans.data.url)) 
        .catch(err => console.log(err))
    }
   

    return(
        

        <div className={d.revContainer2} >               
                
                <div className={d.carritoCont}>
                    <div className={d.productoCont}>
                    <p className={s.nombreProd}> Mi pedido: </p>  
                {data ? data.map(producto => (
                    <div className={d.producto}>
                        <div className={d.org}> 
                            <div className={s.imgCont}>
                                <img className={s.img} src = { producto.product.images[0] ?`http://localhost:3001${producto.product.images[0].imgUrl}` : null}/>
                            </div>
            
                            <div className={s.nombreCont}>
                                <p className={s.nombreProd}> {producto.product.name} </p>
                            </div> 
                        </div>
                        <div className={s.nombreCont}>
                                <p className={s.precio}> Subtotal: $ {producto.line.price} </p>
                        </div> 
                           
                    </div>)) : null }
                    </div>
            </div>
            <div className={d.last}>
                        <div className={s.summary}>     
                            <Summary data={data}/>
                        </div>
        
            <div>
                    
            <button className={d.botonText} onClick={mercadoPago}>Pagar</button>
            {flagPago ? <div> pagar en link: {flagPago} </div>  : null}

           
            <Link to='/'>
            <button className={d.botonText}>Cancelar</button>
            </Link>
            </div>
            </div>
        </div>

    )

    
}
export default Checkout;
import React from 'react'
import { useEffect, useState } from 'react';
import { connect , useDispatch } from 'react-redux';
import jwt from 'jwt-simple';
import EditCantidad from './EditCantidad/EditCantidad';
import Summary from './Summary';
import s from "./../../styles/Carrito.module.css"
import authAxios from '../../axios'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import {setProductCatalogAll, openCart} from './../../store/actions/index'
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);

function Carrito ({openCart,setProductCatalogAll, boolean }){
    const [sidebarOpen, setSidebarOpen] = useState(true)  
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);

    let email;
    let userId;
    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
    if(decoded){
        email = decoded.user.email
        userId= decoded.user.id}

    useEffect(() => {
            authAxios.get('cart/users/' + userId) 
            .then(ans => setData(ans.data))
            .catch(err=> console.log(err))

    },[flag, boolean])

  
    const guestToUser=()=>{
        if(!decoded || decoded.user.rol==='guest'){
        Swal.fire({
        title: 'No estás logueado',
        icon: 'info',
        text: 'necesitas estar logueado para poder comprar',
        showCancelButton: true,
        cancelButtonText:
          '<a style="color:white; text-decoration:none" href="/login">Loguea!</a>',       
        confirmButtonText:
          '<a  style="color:white; text-decoration:none" href="/users/create">Registrate!</a>'
        })
        }else{
            window.location.assign('/pago/checkout')
        }
    return;
    }  
    

    return (
        <Sidebar className={s.sidebar}
        sidebar={
            data.length ?
                <div className={s.carritoCont}>
                    <div className={s.productoCont}>
                    <p className={s.nombreProd}> Mi pedido: </p>  
                {data.map(producto => (
                    <div className={s.producto}>
                        <div className={s.org}> 
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
                        <div className={s.or}>
                            <div className={s.editCant}>
                                <EditCantidad setFlag = {setFlag} flag = {flag} quantity = {producto.line.quantity} stock = {producto.product.stock} productId = {producto.product.id} price = {producto.product.price}/>
                                
                            </div>   
                        </div>
                    </div>)) }
                    </div>
                        <div className={s.summary}>
                            
                            <Summary data={data}/>
        
                            <div className={s.buttonCont}>
                                <button onClick={()=>guestToUser()}className={s.button}>Next</button>
                                <button onClick={()=>openCart(false)} className={s.button}>Cancel</button>
                            </div>
                        </div>
                </div>: 
                <div className={s.vacio}>
                    <h4 className={s.text}>Todavía no elegiste articulos</h4>
                    <img className={s.imgcart} src="https://media.discordapp.net/attachments/777775497798877204/777784869710594058/indice.png" alt=""/>
                    <Link to='/catalogo' onClick={setProductCatalogAll} ><button  className={s.button}>Quiero comprar!</button></Link>
                </div> 
    
    }
        open={sidebarOpen}
        onSetOpen={()=>openCart(false)}
        styles={{ sidebar: { background: "white", transition: "transform 10s ease-out", borderRadius: "20px", 
        WebkitScrollbar: "-webkit-appearance none",
        WebkitTransition: "-webkit-transform 5s ease-out", 
        boxShadow: "5px 5px 10px 0px rgba(0,0,0,0.20)",
        overflowX: "hidden",
        overflowY: "auto",
    } 
      
    }}
        pullRight='true'
      > 
    </Sidebar>
    )}

    const mapStateToProps = (state) => {
        return {
            boolean: state.opencart,
        };
      };



export default connect(mapStateToProps, {setProductCatalogAll, openCart})(Carrito)
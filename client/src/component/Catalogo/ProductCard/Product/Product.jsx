import React from 'react';
import { useState } from 'react';
import s from "./../../../../styles/Product.module.css";
import authAxios from '../../../../axios'
import jwt from 'jwt-simple';
import BoxRate from '../../../Rate/BoxRate';
import Reviews from '../../../Rate/Reviews';
import {verReview, getNumProducts} from '../../../../store/actions/index';
import {connect, useSelector} from 'react-redux';
import { useEffect } from 'react';
import CrudReview from "../../../Rate/CrudReview";
import Swal from 'sweetalert2';



let stock1;

function Product({products, verReview, getNumProducts}) {
    const [cantidad, setCantidad] = useState(1);
    const[error, setError] = useState('');
    const [flagReview, setFlagReview] = useState(false);
    const [flagCrud, setFlagCrud] = useState(false);
    const selector = useSelector(store=> store.verReview)
    const actUser = useSelector(store => store.activeUser)


    let email;
    let userId;
    let {id, name, price, description, stock, images} = products;
  
    stock1 = stock
    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
     if(decoded){
      email = decoded.user.email
      userId= decoded.user.id}
    
    function handleChange(e){
      e.preventDefault()
      setCantidad(e.target.value)
      setError( validate(e.target.value));  
    }

    useEffect(() => {
      return
    }, [flagReview, flagCrud])

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
         /* Toast.fire({
        
            icon: 'success',
            title: 'Producto agregado al carrito'
          })*/
        })
        .catch(()=>Toast.fire({
          icon: 'error',
          title: 'No se pudo agregar al carrito'
        }))
      }
    }  

    let imagesfilter = images && images.slice(1)

    const reviewCounter = () =>{
     return selector.length<1 ? 'Este producto todavía no tiene reviews' : `Reviews ${selector.length}`

    }
    
    
    return (
   
      <div className={s.product} >
        <div style={{width:350}} id="carouselExampleControls" wrap data-interval="2500" className={`carousel slide ${s.slide}`} data-ride="carousel"> 
          <div className="carousel-inner">
          {images &&
            <div className="carousel-item active" >
              <img  style={{width:350}} className="d-block w-100"  src= { images[0] ? `http://localhost:3001${images[0].imgUrl}` : null} alt='sin imagen'/>
            </div>}
            {
            
            imagesfilter ?  imagesfilter.map(img => 
              <div style={{width:350}} className="carousel-item" >
                <img style={{width:350}}  src= {`http://localhost:3001${img.imgUrl}`} alt='sin imagen'/>
              </div>) : null
          }
         </div> 
         <a  className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev"> 
          <span  className={`carousel-control-prev-icon ${s.flechaprev}`} aria-hidden="true"></span>
          <span  className="sr-only">Previous</span>
         </a>
         <a   className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className={`carousel-control-next-icon ${s.flechanext}`} aria-hidden="true"></span>
          <span  className="sr-only">Next</span>
        </a>  
      </div>
        
        <div className={s.card}>
          <h1 className={s.titulo}>{name}</h1>
          
          <p className={s.descripcion}> Descripción : {description} </p>
          {stock ?  <div> 
                      <p className={s.precio}> ${price} </p>
                      <p className={s.stock}> Unidades disponibles: {stock} </p>
                      <input className={s.input} min="1" max={stock} value={cantidad} 
                      type="number" onChange={handleChange}></input>
                      {!error? null : <p className={s.errores}>{error}</p>}
                      {error ? <button className={s.botonText} disabled > Agregar al carrito </button> 
                             : <button className={s.botonText} onClick={handleSubmit} > Agregar al carrito </button>}
                    </div>
                :   <div className={s.noStock}>
                      No hay stock del producto.
                    </div>
          }
           
            <div className={s.rateContainer}>

                <BoxRate />  
                  <button className = {s.botonRev}  onClick = {() => (setFlagReview(true))}>{reviewCounter()}</button>
                {flagReview && selector.length>=1 ? <Reviews name = {name} productId = {id} setFlagReview = {setFlagReview}/> : null}
            </div>  
           {/* {actUser.rol && 
            <button className = {s.botonText2} onClick={()=> (setFlagCrud(true))}>Valorar producto</button>}
           {  flagCrud ? <CrudReview setFlagCrud={setFlagCrud} productId={id} name = {name}/> : null }*/}
      </div>   
      </div>         
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

const mapStateToProps = (state) => {
  return {
      promedio: state.ratePromedio
  };
};
 

  export default connect (mapStateToProps, {verReview, getNumProducts})(Product);
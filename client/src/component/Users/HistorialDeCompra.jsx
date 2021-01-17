import React, { useState, useEffect } from 'react';
import authAxios from '../../axios';
import s from './../../styles/HistorialDeCompra.module.css';
import {connect} from 'react-redux';
import {getAllUserOrder, verReviewUser} from '../../store/actions';
import {Link} from 'react-router-dom';
import CrudReview from "../Rate/CrudReview";
import jwt from 'jwt-simple'


function HistorialDeCompra({ allUserOrder, verReviewUser, reviewUser}) {
     
    const [flagCrud, setFlagCrud] = useState(false);
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    let userId
    console.log(reviewUser)
    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
    if (decoded){
        userId= decoded.user.id;}

    useEffect(()=>{
        verReviewUser(userId)
    },[ reviewUser])

    var casiTotal=0;
    var total =0 ;
    function suma (b){
        if (b ==='restart'){
            casiTotal=total
            total=0
            return casiTotal;
        }
        return total = total + b;
    } 
    
    function setter(id, prod) {
        setFlagCrud(true)
        setId(id)
        setName(prod)
    }
    
    return (
        <div className={s.container}> 
        <div className= {s.revContainer}>
            
                <div className = {s.contBoton}>
                <Link to="/users/menu" ><button className={s.boton}>x</button></Link>
                </div>
        
            {allUserOrder.length ? allUserOrder.map((info)=>(
                <div className={s.compra}>
                <h1 className={s.titulo}> CARRITO #{info.id} Fecha de creación : {info.createdAt.slice(0,10)} </h1>
                    <table>
                        <thead>
                           <th className={s.prod}> Productos </th>
                           <th className={s.cantidad}> Cantidad </th>
                           <th className={s.cantidad}> Estado </th>
                           <th className={s.cantidad}> Precio unitario </th>
                           <th className={s.cantidad}> Subtotal</th>
                        </thead>
                        {info.products ? info.products.map((prod)=>(
                        
                             <tbody>
                                <td>{prod.name} </td>
                                <td>{prod.Line_Order.quantity} </td>    
                                <td>{info.state} </td> 
                                <td >$ {prod.price} </td>
                                                                            
                                <td total={suma(prod.Line_Order.price)}>$ {prod.Line_Order.price} </td>

                              {info.state === "completed" && !reviewUser.find(review => review.productId === prod.id ) ?
                              <td><button className={s.botonText} onClick={()=> (setter(prod.id, prod.name))}>Dejar review</button></td>: null
                              }
                            </tbody> 

                             
                              
                                

                           
                        )): 'no'}
                             
                    </table>
                    <h4 className={s.total} suma={suma('restart')} >TOTAL ${casiTotal} .-</h4> 
                    
                </div>
            )) : null }
            { flagCrud && <CrudReview setFlagCrud={setFlagCrud} productId={id} name = {name}/>}
        </div>
        
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        allUserOrder: state.getAllUserOrder,
        reviewUser :state.verReviewUser
    }
  }

export default connect (mapStateToProps, {verReviewUser})(HistorialDeCompra)


/*CARRITO#      fecha   12/11/20 
 productos       cantidad     status        precio
Pinzas              2         created       300,
Mango               5         processing    500.35
_________________________________________________________________________
Total                                                       800.35
--------------------------Cancelar Pedido--------------------------------*/


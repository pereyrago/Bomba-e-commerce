import React, { useState, useEffect } from 'react';
import {connect, useDispatch} from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import {Link} from 'react-router-dom'
import s from '../../styles/Reviews.module.css';
import EditarReview from './EditarReview';
import {getReview, deleteReview, verReviewUser, setProductCatalogAll} from '../../store/actions';
import jwt from 'jwt-simple';



function ReviewHistory({reviewUser, setFlagReview, getReview, deleteReview, verReviewUser}) {

    let userId;
    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
    if (decoded){
        userId= decoded.user.id;
    }

    
    const[flag, setFlag]=useState(false);
    const [borrarReview, setBorrarReview] = useState(false);

   useEffect(() => {
        verReviewUser(userId)
   }, [borrarReview, flag])

   const dispatch= useDispatch()
   
   const allProducts = ()=> {
    return  dispatch(setProductCatalogAll())
    }

    return(
        <div>
            <div className={s.container}>
            
                <div className={s.revContainer}>
                <div className={s.contBoton}>
                <button className={s.botoneitor}  onClick = {() => (setFlagReview(false))}>x</button>
                </div>
            {
                reviewUser.length ? reviewUser.map(review => (                
                    <div key={review.id }className={s.containerReview}> 
                         <div className={s.containerRate}>
                            <p className={s.nombre}>{review.product.name}</p>
                            <Rating name="half-rating-read" value={review.rate} precision={0.25} readOnly/>                         
                            <p className={s.comentario}>{review.description}</p>
                        </div>
                        <div className={s.containerBoton}>
                            <button className={s.botonText} onClick={() => (setFlag(review),getReview(review.id))}> Editar</button>
                            <button className={s.botonText} onClick = {() => (setBorrarReview(!borrarReview), verReviewUser(userId), deleteReview(review.id))}> Eliminar</button>
                        </div>
                    </div>
                ))
            
            :   <>
                <div className={s.noReview}>
                    <p>Aún no tenés reviews!</p>
                    <p>¯\_(ツ)_/¯</p>                    
                    <Link style={{textDecoration:'none'}} to='/catalogo'>
                        <button className={s.noReviewButton} 
                                onClick={()=>allProducts()}
                        >Mirá nuestros productos</button>
                    </Link>
                </div>
                </>
            }
            { flag ?
                <EditarReview review={flag} setFlag={setFlag}/>
              : null
            }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        reviewUser: state.verReviewUser 
    }
  }

export default connect (mapStateToProps, {getReview, deleteReview, verReviewUser})(ReviewHistory)
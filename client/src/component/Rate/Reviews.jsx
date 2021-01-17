import React from 'react';
import Rating from '@material-ui/lab/Rating';
import {connect} from 'react-redux'
import { useEffect } from 'react';
import s from '../../styles/Reviews.module.css'



function Reviews ({review, setFlagReview, name}) {
   

    useEffect(() => {}, [review])


    return(

        
        <div className = {s.container} onClick = {() => (setFlagReview(false))}>
            <div className= {s.revContainer}>
                
                <div className = {s.contBoton}>
                    <button onClick = {() => (setFlagReview(false))}         
                        className = {s.boton}>x</button>
                </div>
                <p className = {s.nombre}>Reviews {name}</p> 
            {review.length ? review.map(rev => (
            <div className={s.mapContainer}>
                <p className = {s.nombre}>{rev.user.first_name}</p>
                
            <Rating name="half-rating-read" defaultValue={rev.rate} precision={0.25} readOnly/>
              
                
                {rev.description ? 
                <div>
                    <p className = {s.comentario}>Comentario: {rev.description}</p>
                </div> : null}
                
            </div>
            )) : "Este producto aún no tiene reviews"}
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        review: state.verReview
    }
}


export default connect (mapStateToProps, null)(Reviews);
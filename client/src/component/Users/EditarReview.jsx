import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import s from '../../styles/EditReview.module.css';
import authAxios from '../../axios';
import Swal from 'sweetalert2';

function EditarReview({review, setFlag}){

    const [rate, setRate] = useState(review.rate);
    const [description, setDescription] = useState(review.description);

    const handleChangeName = (e) => {
        setRate(e.target.value)
    }
  
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = (idReview) => {        
        authAxios.put('/review/' + idReview, {rate: rate, description: description})
        .then(() => Swal.fire('Review modificada','','success')) 
        .then(()=> setFlag(false))
        .catch(()=> console.log('no se pudo actualizar el review'))
    }
     
    return(
        <div className={s.container}>
            <div className={s.revContainer}>
                <div>
                    <div className={s.contButton}>
                        <h3 className={s.nombre}> Editar Review </h3> 
                        <button className={s.button} onClick={()=> setFlag(false)}>x</button>
                    </div>
                </div>                                 
                <div className={s.contRate}>                    
                    <Rating name="half-rating" precision={0.50} onChange = {handleChangeName} value={rate} defaultValue={rate}/>
                </div>
                <div className={s.contComment}>
                    <label >comentario: </label>
                </div>
                <div className={s.containerInput}>
                    <textarea className={s.contInput} type="text" value={description} onChange={handleChangeDescription} />
                </div>
                <div className={s.ContOk}>
                    <button className={s.botonText} onClick = {() => handleSubmit(review.id)}> Guardar cambios </button>
                </div>    
            </div> 

        </div>
    )

}



export default EditarReview;
import React, {useState} from "react";
import Rating from '@material-ui/lab/Rating';
import authAxios from "../../axios";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {connect} from "react-redux"
import {ratePromedio} from "../../store/actions"
import s from '../../styles/EditReview.module.css'
import Swal from 'sweetalert2'

function CrudReview({productId, setFlagCrud, ratePromedio, name}){
    const [input, setInput] = useState("");
    const [value, setValue] = useState(0);

    const handleChange = (e) => {
        setInput(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        authAxios.post('/review/'+ productId, {rate: value, description: input})
        .then(ans=>{
            Swal.fire('Comentario creado!',
            ' ',
            'success')
            ratePromedio(productId)
        })
        .catch(err => alert(err))
        setFlagCrud(false)
        
    }

    const handleClose = (e) => {
        e.preventDefault()
        setFlagCrud(false)
    }

    return(
    <div className={s.container}>
        <form onSubmit={handleSubmit}>
            <div className={s.revContainer}>                                   
                <div className={s.contButton}>
                    <h3 className={s.nombre}> {name} </h3> 
                    <button className={s.button}  onClick={handleClose}>x</button>
                </div>                
                <div className={s.contRate}>                    
                    <Rating name="half-rating" precision={0.50} value={value} onChange={(e, newValue) => {setValue(newValue)}}  emptyIcon={<StarBorderIcon fontSize="inherit" />}/>
                </div>
                <div className={s.contComment}>
                    <label >comentario: </label>
                </div>
                <div className={s.containerInput}>
                    <textarea className={s.contInput} type="text" value={input} onChange={handleChange} />
                </div>
                <div className={s.ContOk}>
                    <button className={s.botonText}> Agregar review </button>
                </div>            
            </div>
        </form> 
    </div>   
    )
}

export default connect (null, {ratePromedio}) (CrudReview)
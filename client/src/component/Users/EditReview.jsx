import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import s from '../../styles/EditReview.module.css';

function EditReview({review}){
    console.log("NUESTRA REVIEW", review)
    const [input, setInput] = useState(review);

    useEffect(()=>{
       
    },[review])

    const handleChange = (e) => {
        setInput(e.target.value)
    }
     
    return(
            <div>
                <h1> Edit Review </h1>
                <form>
                    <div>
                        <label > Clasificación: </label>
                        <Rating name="half-rating" precision={0.50} value={input.rate} />
                        <label >comentario: </label>
                        <input type="text" value={input.description} onChange={handleChange} />
                        <button> Guardar cambios </button>
                    </div>
                </form>
            </div> 
    )

}

export default EditReview;
import React, {useState,Helmet} from "react";
import Summary from "../Carrito/Summary"
import authAxios from '../../axios'
import { useEffect } from "react";
import {Link} from 'react-router-dom';
import jwt from 'jwt-simple';
import s from "../../styles/Checkout.module.css"

const Checkout= () =>{
 
    const querystring = window.location.search
    const params = new URLSearchParams(querystring)
    let payment_id = params.get('payment_id')
    console.log(payment_id)
   /*  name:"",
    surname:"", 
    id:"",
    articles:""
     */
    const[input, setInput]= useState({
        street: "", 
        number: "",
        apartament: "",
        city: "",
        cp: "",
        province: "",
        country: "",
        phone: "",
        comentario: "",
        articles: []
    })

    const[errors, setErrors] = useState({});
    const[flagPago, setFlagPago] = useState('');
    
    let userId
    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
         if(decoded){
          userId= decoded.user.id}

    const handleChange =  (e) =>{    
            setInput({
            ...input,
            [e.target.name]: e.target.value,
            
        });
         setErrors( validate({
            ...input,
            [e.target.name]: e.target.value,
         
        })) ;  
        }

    useEffect(()=>{
        authAxios.get('cart/users/' + userId) 
        .then(ans => setInput({...input, articles: ans.data}))
        .catch(err=> console.log(err))
    
    },[])

    useEffect(()=>{ 
    },[flagPago])
    
    const handleSubmit = () => {

      
      authAxios.put('checkout/'+ userId, {
        street : input.street,
        number: input.number*1,
        apartament: input.apartament,
        city: input.city,
        cp: input.cp*1,
        province: input.province,
        country: input.country,
        phone: input.phone*1,
        comentario: input.comentario,
        articles: input.articles,
        payment_id: payment_id*1
        })
        .then(ans=> window.location = '/')
        .catch(err=> console.log(err)) 
    
    }

    return(
        

        <div className={s.container}>
            <div className={s.revContainer}>               
                    <div className={s.datos}>
            <p>Completar los datos para realizar el envio</p>
            <label >nombre: </label>           
            <input className={s.input}  onChange={handleChange} type="text" name='name' value={input.name}/>

            <label >apellido: </label>           
            <input className={s.input} onChange={handleChange} type="text" name='surname' value={input.surname}/>
            
            <label >pais: </label>           
            <input className={s.input} onChange={handleChange} type="text" name='country' value={input.country}/>

            <label >Provincia: </label>           
            <input className={s.input} onChange={handleChange} type="text" name='province' value={input.province}/>

            <label >departamento: </label>
            <input className={s.input} onChange={handleChange} type="text" name='apartament' value={input.apartament} />

            <label >city: </label>
            <input className={s.input} onChange={handleChange} type="text" name='city' value={input.city} />

            <label >codigo postal: </label>
            <input className={s.input} onChange={handleChange} type="number" name='cp' value={input.cp} />

            <label >calle: </label>
            <input className={s.input} onChange={handleChange} type="text" name='street' value={input.street} />

            <label >numero de casa: </label>
            <input className={s.input} onChange={handleChange} type="number" name='number' value={input.number} />

            <label >telefono: </label>
            <input className={s.input} onChange={handleChange} type="number" name='phone' value={input.phone} />

            <label >Comentario extra</label>
            <input className={s.input} onChange={handleChange} type="text" name='comentario' value={input.comentario} />
                </div>
                <div className={s.boton}>
            <Summary className={s.summary} data={input.articles}/>
            <button className={s.botonText} onClick={handleSubmit}>Cerrar orden</button>
           
            <Link to='/cart'>
            <button className={s.botonText} >volver al carrito</button>
            </Link>
                </div>
        </div>
    </div>

    )

    
}

export function validate(input) {
    let errors = {};

    if (!input.name || !input.surname  || !input.country || !input.province || !input.apartament || !input.city || !input.cp || !input.street || !input.number || !input.phone ) {
        errors = 'Todos los campos son requeridos';
     }    
 
    
  
    return errors;
}

export default Checkout;
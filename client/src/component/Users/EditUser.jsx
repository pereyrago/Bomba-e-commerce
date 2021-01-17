import React, {useState, useEffect} from 'react';
import s from "./../../styles/ProductForm.module.css";
import authAxios from '../../axios'
import imgs from "../imgs/imgs.js";
import jwt from 'jwt-simple'
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'


const EditUser = () => {
    
    let userId;
    let userFN;
    let userLN;
    let userEmail;

    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
    if (decoded){
        userId= decoded.user.id;
        userFN= decoded.user.first_name;
        userLN= decoded.user.last_name;
        userEmail= decoded.user.email;
    } 
    
    const [input, setInput] = useState({
        first_name: userFN,
        last_name: userLN,
        email: userEmail,
        id : userId
    });

    const[errors, setErrors] = useState({});
    
    const handleChange =  (e) =>{    
            setInput({
            ...input,
            [e.target.name]: e.target.value,
            
        });
        setErrors( validate({
            ...input,
            [e.target.name]: e.target.value,
         
        }));  
    }

    const handleSubmit = e =>{
        e.preventDefault();   
        getSignal()
    }
    
    const getSignal = () => { 
        authAxios
            .put("users/edit/"+input.id, input)
            .then((res) => {
            if(res.status === 200){
                Swal.fire('El usuario ha sido modificado','','success')
                logOut()
            }else{
                alert("El usuario no pudo ser modificado")
            }           
            })
            .catch(() => alert("No fue posible editar el usuario"))
    }

    const logOut= ()=>{
        localStorage.removeItem('token')
       return  window.location.assign('/')
    }

    return (       
        <div className={s.formCard}>    
          <h2> Editar Usuario</h2>
            <form 
                className={s.formulario} 
                onSubmit={handleSubmit}
               >
                    <div 
                        className={s.formGroup}>
                        <label 
                            className={s.label}>Nombre </label>
                        <input 
                            className={s.input}
                            type="text" 
                            name="first_name"
                            onChange={handleChange}
                            value={input.first_name}>
                        </input>
                        {!errors.first_name ? null : <p className="errores">{errors.first_name}</p>}
                    </div>
                    <div 
                        className={s.formGroup}>
                        <label 
                            className={s.label}>Apellido </label>
                        <input 
                            className={s.input} 
                            type="text"  
                            name="last_name"
                            onChange={handleChange}
                            value={input.last_name}>
                        </input>
                        {!errors.last_name? null : <p className="errores">{errors.last_name}</p>}
                    </div>
                    <div 
                        className={s.formGroup}>
                        <label 
                            className={s.label}>Email</label>
                        <input 
                            className={s.input} 
                            type="text" 
                            name="email"
                            onChange={handleChange}
                            value={ input.email }>
                        </input>
                        {!errors.email? null : <p className="errores">{errors.email}</p>}
                    </div>
                               
                        {Object.keys(errors).length ? <button disabled className={s.botonDisabled}> <img src={imgs.save} className={s.icon} alt = 'Guardar'/></button > : <button className={s.botonGuardar}> <img src={imgs.save} className={s.icon} alt = 'Guardar'/></button>}
                   
            </form>
        </div>
    )
}

function validate(input) {
    let errors = {};
    if (input.first_name === "") {
        errors.first_name = 'Nombre es requerido';
    } else if (!/^[a-z ,.'-]+$/i.test(input.first_name)) {
       errors.first_name = 'Nombre es invalido';
    }

    if (input.last_name === "") {
        errors.last_name = 'Apellido es requerido';
    } else if (!/^[a-z ,.'-]+$/i.test(input.last_name)) {
       errors.last_name = 'Apellido es invalido';
    }

    if (input.email === "") {
        errors.email = 'Email es requerido';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
       errors.email = 'Email es invalido';
    }

    
   
  
    return errors;
}

export default EditUser;
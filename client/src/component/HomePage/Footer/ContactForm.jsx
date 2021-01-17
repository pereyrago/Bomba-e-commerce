import React, {useState, useEffect} from 'react';
import s from '../../../styles/ContactForm.module.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import authAxios from '../../../axios';

const ContactForm = () => {
    const[input, setInput]= useState({
        mail: "", 
        name: "",
        texto: "",
       
    })

    const handleChange = (e) =>{
        setInput({
        ...input,
        [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        authAxios.post('/contact/adminMail', input/*{ 
           mail:input.mail,
            name: input.name,
            texto: input.texto 
        }*/)
        
        .then(ans=> (window.location = '/', Swal.fire('Su consulta fue enviada','','success')))
        .catch(err=> console.log(err)) 
        }


return (
    <div className={s.container}>
        <div className={s.formContainer}>
            <div className={s.cont}>
                <Link to="/">
                    <button className={s.x}>x</button>
                </Link>
            </div>
            
            <div className={s.formArea}>
                <label className={s.form}>Ingresa tu mail: </label>
                <input  className={s.recuadro} onChange={handleChange} type="text" name="mail" value={input.mail}></input>
            </div>
            <div className={s.formArea}>
                <label className={s.form}>Nombre y Apellido </label>
                <input className={s.recuadro} onChange={handleChange} type="text" name="name" value={input.name}></input>
            </div>
            <div className={s.formArea}>
                <label className={s.form}>Tu consulta:  </label>
                <div>
                <textarea className={s.recuadro} onChange={handleChange} type="text" name="texto" className={s.textArea} value={input.texto}></textarea>
                </div>
            </div>
            <button className={s.botonText} onClick={handleSubmit}>Enviar</button>
            <Link to='/'><button className={s.botonText} >Cancelar</button></Link>
        </div>
    </div>
)
}

export default ContactForm


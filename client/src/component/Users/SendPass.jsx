import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import authAxios from '../../axios'
import s from '../../styles/SendPass.module.css'

let SendPass = () => {
    const [input, setInput]= useState('')
    let handleSubmit = (e) => {
        e.preventDefault()

        authAxios.post('/users/sendMailPass',{email: input} )
        .then(ans => alert('email enviado'))
        .catch(err=> alert(err))
        setInput('')
    }
    return(
    <div className={s.caja}>
        <div className={s.contenedor}>
            
            <div className={s.cont} >
                <Link to="/login">
                    <button className={s.x}>x</button>    
                </Link>
                   
            </div>
     
            <div>
                <form onSubmit={handleSubmit}>
                    <div className={s.tittle} > Recuperar contraseña </div>
                    <label > Ingrese el email de la cuenta </label>
                    <input className={s.input} type="email" value={input} onChange={(e)=> setInput(e.target.value)}/>
                    <button className={s.botonText}>Enviar email</button>
                </form>
            </div>
        </div>
            

    </div>
    

    )



}

export default SendPass
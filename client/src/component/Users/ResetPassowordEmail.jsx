import React from 'react';
import { useState } from 'react';
import authAxios from '../../axios'
import s from '../../styles/SendPass.module.css'
import {Link} from 'react-router-dom'

let ResetPassowordEmail = () =>{

    const[input, setInput] = useState({
        nueva: '',
        nuevaVerify: ''
    })

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,   
        });
    }
    const querystring = window.location.search
    const params = new URLSearchParams(querystring)
    let pass = params.get('pass')

    const handleSubmit = (e) =>{
        e.preventDefault()
        authAxios.put('users/ResetPassowordEmail', {nueva: input.nueva, nuevaVerify: input.nuevaVerify, pass: pass })
        .then(ans=>{
            alert('contrase;a modificada')
            window.location = '/login'
        })
        .catch(err => alert(err))

    }

    return(
        <div className={s.caja}>
            <div className={s.contenedor}>
                <div className={s.cont}>   
                    <Link to="/login">
                        <button className={s.x}>x</button>
                    </Link>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div>
                        <label > Nueva contraseña </label>
                        <input className={s.input} type="password" name='nueva' onChange={handleChange} value={input.nueva}/>
                    </div>
                    <div>
                        <label > Repita la nueva contraseña </label>
                        <input className={s.input} type="password" name='nuevaVerify' onChange={handleChange} value={input.nuevaVerify}/>
                    </div>
                    
                    <button className={s.botonText}>Confirmar</button>
                </form>
            </div>
        </div>
        
    )

}

export default ResetPassowordEmail
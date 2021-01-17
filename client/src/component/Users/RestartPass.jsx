import React from 'react';
import { useState } from 'react';
import authAxios from '../../axios'
import s from './../../styles/RestartPass.module.css'

let RestartPass = ({setPassRestart}) =>{

    const[input, setInput] = useState({
        actual: '',
        nueva: '',
        nuevaVerify: ''
    })

    const[errors, setErrors] = useState({
        actual: '',
        nueva: '',
        nuevaVerify: ''
    })

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,   
        });
        validate(e)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        authAxios.put('users/editPassword', {input})
        .then(ans=>{
            setPassRestart(false)
            alert('contrase;a modificada')
        })
        .catch(err => alert(err))

    }

    const password = (password) => {
        if (password === "") {
        return setErrors({...errors, nueva : 'Password es requerido' })
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
        return setErrors({...errors, nueva : 'min 8 caracteres, un numero y una mayuscula'})
        }else return setErrors({...errors, nueva: null})
    }
    const newPassword = (password) => {
       if (password != input.nueva) {
        return setErrors({...errors, nuevaVerify : 'NUEVO TEXTO'})
      }else return setErrors({...errors, nuevaVerify : null, check:null})
    }

    function validate(input) {
        switch(input.target.name){
        case 'actual':
            password(input.target.value)
            break;
        case 'nueva': 
            password(input.target.value)
            break;
        case 'nuevaVerify': 
            newPassword(input.target.value)
            break;
        }      
    }

    return(
        <div className={s.caja}>
                <div className={s.contenedor}>
                <form onSubmit={handleSubmit}>
                    <div className={s.xcont}>
                        <p className={s.x} type='button' onClick={()=> setPassRestart(false)}>x</p>
                    </div>
                    <div>
                        <label for='actual' > Contraseña actual </label>
                    </div>
                    <div>
                        <input className={s.input} type="password" id='actual' name='actual' onChange={handleChange} value={input.actual}/>
                    </div>
                    <div>
                        <label className={errors.nueva && s.error} for='nueva' > {errors.nueva || 'Nueva Contraseña'} </label>
                    </div>
                    <div>
                        <input  className={s.input} type="password" id='nueva' name='nueva' onChange={handleChange} value={input.nueva}/>
                    </div>
                    <div>
                        <label className={errors.nuevaVerify && s.error} for='nuevaVerify' > {errors.nuevaVerify || 'Repita la Contraseña nueva'} </label>
                    </div>
                    <div>
                        <input  className={s.input} type="password" id='nuevaVerify' name='nuevaVerify' onChange={handleChange} value={input.nuevaVerify}/>
                    </div>
                    <div>
                        <button className={s.botonText}>Confirmar</button>
                    </div>
                </form>
              
                </div>
            
        </div>
    )

}

export default RestartPass
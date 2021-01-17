import React, {useState, useEffect} from 'react';
import s from "./../../styles/ProductForm.module.css";
import authAxios from "../../axios";
import UserInfo from "./UserInfo"

const DeleteUser = () => {
    
    const [input, setInput] = useState("");
    const[errors, setErrors] = useState("");
    const[user, setUser] = useState({});

    const handleChange = (e) =>{
         setInput(e.target.value)
         setErrors( validate(
            e.target.value
        ))  
    }

    const handleSubmit = (e) =>{
        if (e) e.preventDefault()
        if(input){
            authAxios.get('users/search/'+input)
        .then(res=>{
            setUser(res.data)
            setInput("")
        })  
        }
    }
    
    useEffect( () =>{}, [user]);

    return (   
        <div className={s.formCard}>           
          <h2>Eliminar Usuario</h2>
            <form 
                className={s.formulario} 
               >
                    <div 
                        className={s.formGroup}>
                        <label 
                            className={s.label}> Buscar por email </label>
                        <input 
                            className={s.input} 
                            type="text" 
                            name="email"
                            onChange={handleChange}
                            value={ input }
                            placeholder = "Ingrese su mail">
                        </input>
                        {!errors ? null : <p className="errores">{errors}</p>}
                        <button className={s.botonText} onClick={handleSubmit}> Buscar </button>
                        {Object.keys(user).length? <UserInfo user={user}/> : null}
                        
                    </div>
            </form>
        </div>
    )
}

  export function validate(input) {
    let errors = "";
    if (input === "") {
        errors = 'Email es requerido';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-git]{2,4}$/.test(input)) {
       errors = 'Email es invalido';
    }
    return errors;
    }

export default DeleteUser;
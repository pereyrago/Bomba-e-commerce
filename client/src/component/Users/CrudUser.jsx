import React, {useState, useEffect} from 'react';
import s from "./../../styles/ProductForm.module.css";
import authAxios from '../../axios' 
import jwt from 'jwt-simple'
import Swal from 'sweetalert2'

function CrudUser(props){

     const [input, setInput] = useState({
            first_name: '' ,
            last_name: '' ,
            email:'' ,
            password: ''  ,         
            rol: 'user'
    })
    let userId;
    let newId;

    const[errors, setErrors] = useState({
        first_name: '',
        last_name: '' ,
        email:'' ,
        password: ''  ,      
        check: 'user'
    });    
    const handleChange =  (e) =>{    
            setInput({
            ...input,
            [e.target.name]: e.target.value,
            
        });        
        validate(e);  
    }

  
     const handleSubmit = e =>{
         e.preventDefault();
         const Toast = Swal.mixin({
        toast: true,        
        position: 'center',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
         
         const getSignal = async () => { await authAxios
            .post("users/create", input) 
            .then((ans)=>{
                if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
                if(decoded){
                 userId= decoded.user.id                 
                }  
                let  newToken = jwt.decode(ans.data, "ecommerce-ft06-g07");
                if(newToken) newId = newToken.user.id
          
                localStorage.removeItem('token')
                localStorage.setItem('token', ans.data)
          
                if(userId){
                    return authAxios.put("cart/updateCart/"+userId+'/'+newId)
                }else{
                  return 
                }
              })
              .then(ans=>{
                    return  window.location.assign('/')
              })
              .catch(()=> window.location.assign('/')
              )}
        getSignal()
        setInput({
            first_name: '' ,
            last_name: '' ,
            email:'' ,
            password: ''  ,
            rol: 'user'
        })
        // setFlag(!flag)        
        
    }
    
//validations
const firstName = (firstName) => {
    if (firstName === "") {
        return setErrors({...errors, first_name:'Apellido es requerido'})
     } else if (!/^[a-z ,.'-]+$/i.test(firstName)) {
       return setErrors({...errors, first_name:'El apellido es inválido'})
     }else return setErrors({...errors, first_name : null})
}

const lastName = (lastName) => {
    if (lastName === "") {
        return setErrors({...errors, last_name:'Apellido es requerido'})
     } else if (!/^[a-z ,.'-]+$/i.test(lastName)) {
       return setErrors({...errors, last_name:'El apellido es inválido'})
     }else return setErrors({...errors, last_name : null})
}
const email = (email) => {
  if (email === "") {
    return setErrors({...errors, email:'El email es requerido'})
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return setErrors({...errors, email :'El email es inválido'})
  }else return setErrors({...errors, email: null})
}

const password = (password) => {
    if (password === "") {
    return setErrors({...errors, password : 'Password es requerido' })
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
    return setErrors({...errors, password : 'min 8 caracteres, un numero y una mayuscula'})
    }else return setErrors({...errors, password : null, check:null})
}
        

    
    function validate(input) {
        console.log(input.target.name)
        
        switch(input.target.name){
            case 'first_name' : 
            firstName(input.target.value)
            break;

            case 'last_name' :
            lastName(input.target.value)
            break;
            
            case 'email' :
            email(input.target.value)
            break;

            case 'password' :
            password(input.target.value)
            break;
        }
    }

    
return (
        <div className={s.formCard}>    
          <h2> Usuario</h2>
            <form 
                className={s.formulario} 
                onSubmit={handleSubmit}
               >
                    <div 
                        className={s.formGroup}>
                        <label 
                            className={s.label}>Nombre </label>
                        <input 
                            className={ errors.first_name ? s.errInput : s.input}
                            type="text" 
                            name="first_name"
                            onChange={handleChange}
                            value={input.first_name}
                            placeholder = "Ingrese su nombre">
                        </input>
                        {!errors.first_name ? null : <p className={s.errores}>{errors.first_name}</p>}
                    </div>
                    <div 
                        className={s.formGroup}>
                        <label 
                            className={s.label}>Apellido </label>
                        <input 
                            className={ errors.last_name ? s.errInput : s.input}
                            type="text"  
                            name="last_name"
                            onChange={handleChange}
                            value={input.last_name}
                            placeholder = "Ingrese su apellido">
                        </input>
                        {!errors.last_name? null : <p className={s.errores}>{errors.last_name}</p>}
                    </div>
                    <div 
                        className={s.formGroup}>
                        <label 
                            className={s.label}>Email $</label>
                        <input 
                            className={ errors.email ? s.errInput : s.input} 
                            type="text" 
                            name="email"
                            onChange={handleChange}
                            value={ input.email }
                            placeholder = "Ingrese su mail">
                        </input>
                        {!errors.email? null : <p className={s.errores}>{errors.email}</p>}
                    </div>
                    <div className={s.formGroup}>
                        <label 
                            className={s.label}>Password</label>
                            <input 
                                className={ errors.password ? s.errInput : s.input}
                                type="password" 
                                name="password"
                                onChange={handleChange}
                                value={input.password }
                                placeholder = "Password (min 8 caracteres, un numero y una mayuscula)">
                            </input> 
                            {!errors.password? null : <p className={s.errores}>{errors.password}</p>}
                    </div>
                                               
                        {errors.first_name || errors.last_name || errors.email || errors.password || errors.adress || errors.check? <button className={s.botonDisabled} disabled>Guardar</button> : <button className={s.botonText}>Guardar</button>}
                   
            </form>
        </div>
    )
}

/* 
    
   
  
    return errors; */


export default CrudUser;



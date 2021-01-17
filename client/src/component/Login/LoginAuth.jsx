import React from 'react'
import { useEffect } from 'react'
import authAxios from '../../axios'
import {Redirect} from 'react-router-dom'
import jwt from 'jwt-simple'

const LoginAuth = () => {

    // recuperamos el querystring
    const querystring = window.location.search

    // usando el querystring, creamos un objeto del tipo URLSearchParams
    const params = new URLSearchParams(querystring)

    let tokenAuth = params.get('token')
    let userId;
    let newToken;
    let newId;
    console.log(tokenAuth)
    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
          if(decoded){
          userId= decoded.user.id
          }  
          newToken = jwt.decode(tokenAuth, "ecommerce-ft06-g07");
          if(newToken) newId = newToken.user.id

          localStorage.removeItem('token')
          localStorage.setItem('token', tokenAuth)
          if(userId){
            authAxios.put("cart/updateCart/"+userId+'/'+newId)
            .then(ans=>{
                if(newToken) return  window.location = '/'
              })

          }else{
            window.location = '/'
          }
    
    return(
        <div></div>
    )

   

}

export default LoginAuth
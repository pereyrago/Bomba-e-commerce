import React from 'react'
import { useEffect } from 'react'
import authAxios from '../../axios'
import {Redirect} from 'react-router-dom'

const Success = () => {

    // recuperamos el querystring
    const querystring = window.location.search
    console.log(querystring) // '?q=pisos+en+barcelona&ciudad=Barcelona'

    // usando el querystring, creamos un objeto del tipo URLSearchParams
    const params = new URLSearchParams(querystring)

    console.log(params)

    //authAxios.post('/checkout/success', params)
    

    return (<Redirect to='/mercadoPago'/>)

}

export default Success
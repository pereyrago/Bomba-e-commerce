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

    let status = params.get('status')
    let payment_id = params.get('payment_id')
    let payment_type =params.get('payment_type')
    let merchant_order_id =params.get('merchant_order_id')
    let preference_id =params.get('preference_id')

    authAxios.post('/checkout/success', {status, payment_id: payment_id*1, payment_type, merchant_order_id: merchant_order_id*1, preference_id})
    .then(ans=>{
        return (window.location = `/checkout?payment_id=${payment_id}`)
    })
    .catch(err=> console.log(err)  )
    
    return(
        <div></div>
    )

   

}

export default Success
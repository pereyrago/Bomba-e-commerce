import React, {useState,useEffect, useRef} from 'react';
import authAxios from '../../../axios'


function CrudProduct (){

    const[option, setOption]=useState('index')
    const[img,setImg]=useState()
    const input=useRef(null)
    const optionChanger= (option)=>{
        return setOption(option)
    }
    var obj={        
            name: 'asd' ,
            description:'asd' ,
            price: '123'  ,
            stock: '123'  ,
            imgUrl: img ,
            categoryId: '1'
    
    }
    let seleccionImg= (evento)=>{
        setImg(evento.target.files[0])
    }
    let subirImg=()=>{
        authAxios.post('products/addProduct', obj )
        .then(()=>alert('ok'))
        .catch(()=>alert('fail'))

    }

    let onSelectImg=()=>{
        input.current.click()
    }

    return(
        <>
            <input type='file' multiple="multiple" style={{display:'none'}} onChange={seleccionImg} ref={input}/>
            <button onClick={ ()=>onSelectImg()} value='Subir'>Subí tus fotos</button>
        </>
    )
}


export default CrudProduct;
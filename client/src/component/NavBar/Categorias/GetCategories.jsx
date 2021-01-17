import React, {useEffect, useState} from 'react'
import authAxios from '../../../axios'
import {Link} from 'react-router-dom'
import {setProductCatalogCategory, updateCategories } from '../../../store/actions/index.js';
import {useSelector, useDispatch} from 'react-redux';

function GetCategories (){

const selector=useSelector(store => store.categories)
const dispatch=useDispatch()

/* const [categorias, setCategorias] = useState([]);     */
    useEffect(() => {
        dispatch(updateCategories())   
    },[]);    
    
    const selectCat= (name)=>{
       return dispatch(setProductCatalogCategory(name))
    }


    return(
        <>
            {selector[0] ? selector.map(c=>(<Link className="dropdown-item" to='/catalogo/selected' onClick={()=> selectCat(c.name)}> {c.name}</Link>)) : null}       

        </>
    )
}


export default GetCategories;
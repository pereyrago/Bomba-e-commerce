import React, {useState} from 'react';
import s from "../../../styles/NavBar.module.css";
import {Link} from "react-router-dom";
import {setProductCatalogSearch} from '../../../store/actions/index'
import {connect} from 'react-redux';




function SearchBar ({setProductCatalogSearch}){
    const [search,setSearch]=useState('')
    
    let handleChange= (e) =>setSearch(e.target.value);
    

    return (
    <>
        <div className={s.search} >
            <input className={s.input} id="Input" type="text" onChange={handleChange} value={search}/>
           <Link to="/catalogo/search" onClick={() => (setProductCatalogSearch(search), setSearch(''))}> 
           <button className={s.botonText}>Buscar</button> 
           </Link>

        </div>    
    </>)
}

  
export default connect(null,{setProductCatalogSearch})(SearchBar);

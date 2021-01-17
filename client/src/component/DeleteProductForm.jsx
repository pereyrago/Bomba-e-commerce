import React, {useState, useEffect} from 'react';
import s from "./../styles/ProductForm.module.css";
import authAxios from "../axios";
import ProductList from "./ProductList.jsx";



const DeleteProductForm = () => {


    const [input, setInput] = useState("");
    const [products, setProducts] = useState([])
    const [flagDel, setFlagDel] = useState (false)
    let value;

useEffect( () =>{
      
   }, [products]);

  

    const handleChange = (e) =>{
        setInput(e.target.value);
    }

    const handleSubmit = (e) =>{
        if (e) e.preventDefault()
        if(input){
            authAxios.get('products/search/'+input)
        .then(res=>{
            setProducts(res.data)
            value = input
            setInput("")
        })  
        }else{
            authAxios.get('products/search/'+ value )
        .then(res=>{
            setProducts(res.data)
            setInput("")
        })  
    }
    }

    return (
        
        <div className={s.formCard}>
             
          <h2>Eliminar o Modificar Producto</h2>
            <form 
                className={s.formulario} 
               >
                    <div 
                        className={s.formGroup}>
                        <label 
                            className={s.label}> Buscar por nombre </label>
                        <input 
                            className={s.input}
                            type="text" 
                            name="name"
                            onChange={handleChange}
                            value={input}>
                        </input>
                        <button className={s.botonText} onClick={handleSubmit}> Buscar </button>
                        {
                        products ? 
                            products.map(product =>
                                <ProductList flagDel={setFlagDel} submit={handleSubmit} serch ={setInput} key={product.id} name={product.name} imgUrl={product.imgUrl} id={product.id} />
                            ) : null
                        }
                    </div>
            </form>
        </div>
    )
  }

export default DeleteProductForm;


import React from 'react';
import s from "./../styles/AddProductForm.module.css";
import EditProductFrom from "./EditProductFrom";


const AddProductForm = () => {
  
    return (
        
        <div className={s.formCard}>
          <h2>Agregar Producto</h2>
          <EditProductFrom />
        </div>
    )
  }  
  export default AddProductForm;





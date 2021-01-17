import React, {useState, useEffect} from 'react';
import AddProductForm from "../../../AddProductForm";
import DeleteProductForm from "../../../DeleteProductForm";
import s from "./../../../../styles/CrudProduct.module.css";
import ProductForm from '../../../ProductForm';


function CrudProduct() {
  
const[button, setButton] = useState({
    
    action: null
});

useEffect(() => {
         
    },[button])




const onAdd = () => {
    setButton({...button, action: "add"})
}

const onEdit = () => {
    setButton({...button, action: "edit"})
}

const onDelete = () => {
    setButton({...button, action: "delete"})
}

    return (
      <div className={s.crud}>
        
            <button className={s.boton} onClick={onAdd}>Agregar Producto</button>
            <button className={s.boton} onClick={onDelete}>Modificar o Eliminar Producto</button>
        
             { button.action === null ?
               null : 
               button.action === "add" ?
               <AddProductForm /> :
               button.action === "delete" ?  
               <DeleteProductForm />:null
               
            }
          
        
      </div>
    );
  }
  
  export default CrudProduct;
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import s from "./../../../styles/PostDelCatProd.module.css";
import Swal from 'sweetalert2';
import authAxios from '../../../axios';


function PostDelCatProd () {
    const[products,setProducts]=useState([]);
    const[input,setInput]=useState()
    const[categories,setCategories]=useState([])
    const[renew,setRenew]=useState({})

    
    //llamado a la api para traer categorias y productos
    useEffect(()=>{
        setTimeout(()=> authAxios.get('products/')    
        .then((res) =>setProducts(res.data ))        
        .catch(console.log('Algo salió mal :/')),100)
         setTimeout(()=> authAxios.get('products/category')
        .then((res) =>setCategories(res.data))    
        .catch(console.log('Algo salió mal :/')),100)
    },[renew])
   

    //logica
    function addCategory(pId){
        if(!input) return Toast.fire({icon: 'error',  title: 'No seleccionaste ninguna categoría'})
        setRenew({pId})
        authAxios.post(`products/${pId}/category/${input}`)
        .then(()=> Toast.fire({icon: 'success', title: 'Categoría agregada al producto'}))
        .catch(()=> Toast.fire({icon: 'error', title: 'Ese producto ya tiene la categoría'}))
        };    
    
    function delCategory(pId){
        if(!input){
            return Toast.fire({icon: 'error', title: 'No seleccionaste ninguna categoría'});}  
        setRenew({pId})
        authAxios.delete(`products/${pId}/category/${input}`)
        .then(()=> Toast.fire({icon: 'success', title: 'Categoría borrada'}))
        .catch(()=>()=>Toast.fire({icon: 'error', title: 'No se pudo borrar la categoría de ese producto'}))
    };
    

    //SweetAlert  popUp config
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
    
    return(
        <>  
        <div className={s.seleccion}>
        <p className={s.par}>Primero Selecciona la categoría que quieres agregar/eliminar</p>
        {categories ? categories.map(category=> <button className={input===category.id ? s.boton : s.boten} onClick={()=>(setInput(category.id))}>{category.name}</button>): <h1>No Tienes Categorias</h1>}
        <p className={s.par}>Ahora selecciona el producto y presiona ( + ) para agregar o ( - ) para eliminar </p>
        </div>
        <table className={s.tabla}>
        <tr className={s.prod}>
            <th className={s.titulo}>Producto</th>
            <th className={s.titulo}>Categorias</th>
            <th className={s.agregar}>Agregar</th>
            <th className={s.agregar}>Eliminar</th>
        </tr>
        {products ? products.map(producto =>(
            <tr>
                <td className= {s.par1}>{producto.name}</td>
                <td className= {s.par1}>{producto.categories.map(e=>(" | "+ e.name)) }</td>
                <td className={s.par}><button className= {s.botonChiquito} onClick={()=> addCategory(producto.id) }>+</button></td>
                <td className={s.par}><button  className= {s.botonChiquito} onClick={()=> delCategory(producto.id) }>-</button></td>
            </tr>
        )):null}
        </table>
        <div className={s.botonContainer}>
        <Link  type='button' to='/admin/categories'><button className={s.boton2}>Categorias</button></Link>
        <Link  type='button' to='/admin/products'><button className={s.boton2}>Productos</button></Link>
        </div>
    </>
)
}

export default PostDelCatProd;


import React, {useState, useEffect} from 'react';
import s from "./../styles/ProductForm.module.css";
import swal from 'sweetalert';
import axios from 'axios';
import {Link} from "react-router-dom";
import authAxios from '../axios';
import Swal from 'sweetalert2';

function EditProductFrom(){
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    
    //usestate
    useEffect(() => {
       const getResult = async () => {
           const result = await authAxios.get('products/category')
           setData(result.data) 
           setFlag(true)
       }        
       getResult();
    },[flag])

    //states
    const [input, setInput] = useState({
            name: '' ,
            description:'' ,
            price: ''  ,
            stock: ''  ,
            files:[],
            categoriesId: []
        })
    const[errors, setErrors] = useState({
        name:'',
        description:'',
        price:'',
        stock:''
    });

    //logica
    const handleChange =  (e) =>{    
            setInput({
            ...input,
            [e.target.name]: e.target.value
        });        
        setErrors( validate({
            ...input,
            [e.target.name]: e.target.value         
        }));
    }

     const handleSubmit = e =>{
         e.preventDefault();
                           
         const getSignal = async () => { await
             authAxios.post("products/addProduct", input)          
            .then((r)=> subirImagen(r.data.id))
            .catch((err)=>alert(err))
        }

        const subirImagen=async (idProd)=>{

            const form= new FormData()
            for(let img=0; img<input.files.length; img++){
                form.append('image', input.files[img])
            }
            return await authAxios.post(`products/images/${idProd}`, form,  
            {headers:{'Content-type': 'multipart/form-data'}})
            .then(()=> ( Swal.fire('Producto creado con éxito','','success')))
            .catch((r)=> console.log(r))
        }

        if (input.name && input.description && input.price && input.stock && input.categoriesId){
            getSignal()
            setInput({
                name: '' ,
                description:'' ,
                price: ''  ,
                stock: ''  ,
                categoriesId: []
            })
            setData([])
            setFlag(!flag)
            }else swal('Error', 'Hay campos incompletos','error')
    }

    
    const setCategories=(cat)=>{
        let check = input.categoriesId.indexOf(cat)
        let filter = input.categoriesId.filter(category => category !== cat)

        if(check===-1){
            return setInput({
            ...input,
            categoriesId:[cat, ...input.categoriesId]
            })
        }
        else return setInput({ ...input,
            categoriesId:filter
        })
    }

    const deleteNewImg=(img)=> {
        let newFiles= input.files.filter(file => file !== img );
        return  setInput({...input, files: newFiles });
    }


return (

        <div className={s.formCard}>
          <h2> Producto</h2>
            <form 
                className={s.formulario} 
                onSubmit={handleSubmit}
               >
                    <div 
                        className={s.formulario}>
                        <label 
                            className={s.label}>Nombre </label>
                        <input 
                            className={errors.name ? s.formularioErrName : s.input}
                            type="text" 
                            name="name"
                            onChange={handleChange}
                            value={input.name}
                            placeholder = "Nombre del producto">
                        </input>
                        {!errors.name ? null : <p className={s.errores}>{errors.name}</p>}
                    </div>
                    <div 
                        className={s.formulario}>
                        <label 
                            className={s.label}>Descripción </label>
                        <input 
                            className={errors.description ? s.formularioErrDescription : s.input} 
                            type="textarea" 
                            maxLength="300" 
                            name="description"
                            onChange={handleChange}
                            value={input.description}
                            placeholder = "Ingrese una descripción">
                        </input>
                        {!errors.description? null : <p className={s.errores}>{errors.description}</p>}
                    </div>
                    <div 
                        className={s.formulario}>
                        <label 
                            className={s.label}>Precio $</label>
                        <input 
                            className={errors.price ? s.formularioErrPrice : s.input} 
                            type="text" 
                            name="price"
                            onChange={handleChange}
                            value={ input.price }>
                        </input>
                        {!errors.price? null : <p className={s.errores}>{errors.price}</p>}
                    </div>
                    <div className={s.formulario}>
                        <label 
                            className={s.label}>Stock</label >
                            <input 
                                className={errors.stock ? s.formularioErrStock : s.input} 
                                type="text" 
                                name="stock"
                                onChange={handleChange}
                                value={input.stock }>
                            </input> 
                            {!errors.stock? null : <p className={s.errores}>{errors.stock}</p>}
                    </div>
                    <div className={s.formulario}>
                        <label for='image' className={s.imgLavel}>Subir Imagenes</label>
                        <input 
                            className={s.inputImg} 
                            type="file" 
                            name="image"
                            id='image'                            
                            multiple
                            onChange={(e)=> setInput({...input, files: input.files.concat(Array.from(e.target.files))})}/>
                        <div className={s.imagesContainer}> 
                        {input.files && input.files.map(file=>
                            <div className={s.borde}>
                                <div className={s.imageCard} style={{backgroundImage:`url(${URL.createObjectURL(file)})`}}>
                                <button className={s.imageButton} type='button' onClick={()=> deleteNewImg(file)}> x </button>
                         
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className={s.categories}>
                        <div>Categoría
                        <div>
                        { data.map(cat =><button className={input.categoriesId.includes(cat.id) ? s.botonClaseActive : s.botonClase } type='button' onClick={(e)=>(setCategories(cat.id))}> {cat.name} </button>)}                             
                        </div>
                        </div>
                    </div>
                    <div>
                        {Object.keys(errors).length ? <button className={s.botonDisabled} disabled> Guardar</button> : <button className={s.botonGuardar}>Guardar</button>}
                        <Link to="/admin/categories/"><button className={s.botonTexto}> Crear Categoría </button></Link>
                        <Link to="/admin/prodCategories/"><button className={s.botonTexto}> Agregar/Eliminar Categoría </button></Link>
                   </div>                       
                   
            </form>
        </div>
    )


    
}

export function validate(input) {
    let errors = {};

    if (input.name && !/^[a-z ,.'-]+$/i.test(input.name)) {
        errors.name = 'Name is invalid';
     }    
 
     if (input.price && !/^[0-9]+$/.test(input.price)) {
        errors.price = 'Price is invalid';
     }
 
     if (input.stock && !/^[0-9]+$/.test(input.stock)) {
        errors.stock = 'Stock is invalid';
     }
  
    return errors;
}

export default EditProductFrom;

import React, {useState, useEffect} from 'react';
import s from "./../styles/ProductForm.module.css";
import authAxios from '../axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

const ProductForm = (props) => {
     const [data, setData] = useState([]);
     const [input, setInput] = useState({
        name: props.name,
        description:props.description,
        price:props.price,
        stock:props.stock,
        imgUrl:props.imgUrl,   
        files:[],
        categories: props.categories,
    });


     useEffect(() => {
         let response;
        const getResult = () => {
            const result = authAxios.get('products/category')
            .then((res)=> response = res.data.map(cat=> [cat.id, cat.name]))
            .then(()=> setData(response))
        }
        getResult();
    
    },[])


    const[errors, setErrors] = useState({});


    const handleChange =  (e) =>{    
            setInput({
            ...input,
            [e.target.name]: e.target.value,

        });
        setErrors( validate({
            ...input,
            [e.target.name]: e.target.value,

        }));  
    }

     const handleSubmit = e =>{
        e.preventDefault();

       let mapeo = input.imgUrl.map(img=> img[1])  
        authAxios.put("products/"+props.id, input)
            
            .then(() => {
                props.setFlag({...props.flag, dos: true})
                return subirImagen()
            })

            .catch(() => Toast.fire({icon: 'error', title: 'No se pudo editar el producto'}))
    }
    
    const subirImagen=async ()=>{
        const form= new FormData()
        for(let img=0; img<input.files.length; img++){
            form.append('image', input.files[img])
        }
        return await authAxios.post(`products/images/${props.id}`, form,  {headers:{'Content-type': 'multipart/form-data'}})
        .then((r)=> console.log(r))
        .catch((r)=> console.log(r))
    }
    
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
   
    //funcion del para borrar img
    const deleteImg=(id, img)=>{
        let imgFilter = input.imgUrl.filter(image=> image[1] !== img)
        setInput({...input, imgUrl:imgFilter});
        authAxios.delete(`/products/images/${id}`)
        .then(()=> alert('imagen borrada'))
        .catch(()=> console.log('error'))
    }

    const deleteNewImg=(img)=> {
        let newFiles= input.files.filter(file => file !== img );  
        return  setInput({...input, files: newFiles });
    }

    const setCategories=(cat)=>{
        let check = input.categories.indexOf(cat)
        let filter = input.categories.filter(category => category !== cat)

        if(check===-1){
            return setInput({
            ...input,
            categories:[cat, ...input.categories]
            })
        }
        else return setInput({ ...input,
            categories:filter
        })
    }

    

    return (
        <div className={s.formCard}>           
            <form 
                className={s.formulario} 
                onSubmit={handleSubmit}
                >
                    <div 
                        className={s.formGroup}>
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
                        className={s.formGroup}>
                        <label 
                            className={s.label}>Descripción </label>
                        <input 
                            className={errors.description ? s.formularioErrDescription :s.input}
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
                        className={s.formGroup}>
                        <label
                            className={s.label}>Precio $</label>
                        <input
                            className={errors.price ? s.formularioErrPrice : s.input}
                            type="text" 
                            name="price"
                            onChange={handleChange}
                            value={ input.price}>
                        </input>
                        {!errors.price? null : <p className={s.errores}>{errors.price}</p>}
                    </div>
                    <div className={s.formGroup}>
                        <label 
                            className={s.label}>Stock</label>
                            <input 
                                className={errors.stock ? s.formularioErrStock :s.input} 
                                type="text" 
                                name="stock"
                                onChange={handleChange}
                                value={input.stock}>
                            </input> 
                            {!errors.stock? null : <p className={s.errores}>{errors.stock}</p>}
                    </div>
                    <div className={s.formGroup}>
                    <div>
                        <label for='image' className={s.imgLavel}>Imagenes</label>
                            <input 
                                type="file" 
                                name="image"
                                id="image"
                                multiple
                                className={s.inputImg}
                                onChange={(e)=> setInput({...input, files: input.files.concat( Array.from(e.target.files))})}/>
                    </div>
                    <div className={s.imagesContainer}>
                        {input.imgUrl && input.imgUrl.map(image=>   
                        <div className={s.borde}>
                            <div className={s.imageCard} width='100' style={{backgroundImage:`url(http://localhost:3001${image[1]}`}}>
                            <button className={s.imageButton} type='button' onClick={()=> deleteImg(image[0], image[1])}> x </button>
                            </div>
                        </div>)}

                        {input.files && input.files.map(file=>
                        <div className={s.borde}> 
                                <div className={s.imageCard} style={{backgroundImage:`url(${URL.createObjectURL(file)})`}}>
                                <button className={s.imageButton} type='button' onClick={()=> deleteNewImg(file)}> x </button>
                                </div>
                        </div>)}
                    </div>                        
                    </div>
                    <div className={s.categories}>
                        <div>Categoría
                            <div>
                        { data.map(cat =>
                                <button type='button' className={input.categories.includes(cat[0]) ? s.botonClaseActive : s.botonClase}  key={cat[0]} onClick={(e)=>(setCategories(cat[0]))} >{cat[1]}</button>
                                )
                        }
                            </div>
                        </div>
                    </div>                    
                    <div>
                        <Link  to='/admin/prodCategories'><button className={s.botonText2}>Asignar/eliminar Categorias </button></Link>
                        <Link  to='/admin/categories'><button className={s.botonText2}> Agregar Categoría </button></Link>
                    </div>

                        {Object.keys(errors).length ? <button className={s.botonDisabled} disabled>Guardar</button> : <button className={s.botonGuardar}> Guardar </button>}

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

export default ProductForm;


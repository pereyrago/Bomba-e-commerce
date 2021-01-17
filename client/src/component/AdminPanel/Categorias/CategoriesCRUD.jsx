import React, {useState, useEffect} from 'react';
import s from "./../../../styles/Container.module.css";
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import authAxios from '../../../axios';
import {useSelector, useDispatch} from 'react-redux'
import {updateCategories} from './../../../store/actions/index'


export default function Container () {
    const [category, setCategory]=useState({})
    const [input,setInput]=useState('')
    const [error, setError] = useState('');
    const [edit, setEdit]= useState(true)
    const [editId,setEditId]= useState('')
    const selector = useSelector(store=> store.categories)
    const dispatch = useDispatch()

    //DidMount didUpdate
    useEffect(() => {
        dispatch(updateCategories())
    
    }, [category]);

    //validacion de campos
    const validate = (input) =>{
        if (input === "") {
            setError('Name is required');
        } else if (!/^[a-z ,.'-]+$/i.test(input)) {
            setError('Name is invalid');
        }
        else setError('')
    }; 
    //fn borrar cat
    const deleteCategory =(input) => {
    
        authAxios.delete('products/category/'+input)
        .then( (resp) => setCategory(resp))
        .then((resp) => Toast.fire({icon: 'success', title: 'Categoría eliminada'}))       
        .catch(() => Toast.fire({icon: 'error', title: 'No se pudo eliminar la categoría'}))
        
    };
  
    //fn add cat
    const addCategory = (category) => {
        let obj={name : category}
            setInput('')
            authAxios.post('products/category' , obj)
            .then( (resp) => setCategory(resp))
            .then(()=> Toast.fire({icon: 'success', title: 'Categoría creada'}))
            .catch(()=> Toast.fire({icon: 'error', title: 'No se pudo crear la categoría'}))     
    };

    //fn editCat
    const editCategory = (category) => {
        let obj={name : category}
        setInput('')
        authAxios.put('products/category/'+ editId, obj)
        .then( (resp) => setCategory(resp))
        .then(() => Toast.fire({icon: 'success', title: 'Categoría editada'}))
        .catch(() => Toast.fire({icon: 'error', title: 'No se pudo editar la categoría'}))
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
        
        <div className={s.containertodo}>  
            {edit ? 
            <div className={s.crear}> 
                  <h3 key='titulo' >Crea una Categoria</h3>
                    <input className={s.input} key='inputCreate' value={input} onChange={ (e)=>(setInput(e.target.value), validate(e.target.value)) }/>
                    <button className={s.botonCrear} type="button" key='botonCreate' onClick={()=>(addCategory(input))}>Crear</button>
                    <p>{error}</p>

                </div>: 
                <div className={s.crear}> 
                    <h3 key='titulo' >Edita una Categoria</h3>
                    <input className={s.input} key='inputCreate' value={input} onChange={ (e)=>(setInput(e.target.value), validate(e.target.value)) }/>
                    <button className={s.botonCrear} type="button" key='botonEdit'onClick={()=>(editCategory(input))}>Confirmar</button>
                    <p>{error}</p>
                    
                <button className={s.botonCrear} onClick={()=> setEdit(true)}>Crear Categoría</button> 
             </div>}
              
            <p className={s.subtitulo}>Categorias</p>
            <div className={s.listado}>           
                <ul className={s.ul} key='listCat'>
                {selector  ? selector.map(cat=> 

                <div className={s.category}>                    
                <li className={s.categoria} key={cat.id}>{cat.name} </li>
                   <button className={s.botonCrear} title="Editar categoria" onClick={()=>(setEdit(false), setEditId(cat.id), setInput(cat.name))}> Editar </button>
                   <button className={s.botonCrear} title="Eliminar categoria" onClick={()=>deleteCategory(cat.id)}> Eliminar </button>

                </div>) : <h1>No hay Categorias</h1>}        
                </ul>                       
            </div>
            <div>
                <p className={s.ira}> Ir a</p>
                <div  className={s.container}>
                    <Link className={s.boton} type='button' to='/admin/prodCategories'>Asignar / Eliminar categorías</Link>
                    <Link className={s.boton} type='button' to='/admin/products'>Productos</Link>
                </div>
            </div>
        </div>
    );
}





import React, {useState, useEffect} from 'react';
import s from './../../../styles/OrderTable.module.css'
import authAxios from '../../../axios';
import imgs from "../../imgs/imgs.js";
import OrderCart from './OrderCart';




function OrderTable () {
    
    const [display, setDisplay] = useState([]);
    const [dataCart, setDataCart] = useState(null)
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(false)

    useEffect(()=>{
        getAll()
    }, [flag, setFlag])
    

    const getAll = async() => {
        await authAxios.get('orders/all')
            .then(respuesta => {
                setDisplay(respuesta.data)
                return setData(respuesta.data)
            })
            .catch(error => alert ('Ha ocurrido un error ' + error))
    }

    //función que filtra por userId
    const searchById = UserId => {
        let userFilter = data.filter(e => e.userId===UserId)
        return setDisplay(userFilter)
    }   

    //función que filtra por state del carrito
    const searchByState = state => {
        let stateFilter = data.filter(e=> e.state===state)
        return setDisplay(stateFilter)
    }

    //Función para recortar las fechas
    const splitter = e => {
        return e.slice(0,10)
    }

    //Funcion que da el color según state de la orden
    const tableRowStyle = e => {
        if (e=='created') return `table-info + ${s.created}`;
        if (e=='cart') return `table-dark ${s.cart}`;
        if (e=='processing') return `table-warning ${s.created}`;
        if (e=='canceled') return `table-danger ${s.created}`;
        return `table-success ${s.created}`
    }

    //función que setea dataCart y levanta el renderizado de OrderCart
    const idCart= cartId => {
        authAxios.get(`products/${cartId}/users/`)
        .then((ans) => setDataCart(ans.data))
        .catch((err) => 'Error ' + err)
    }

    //función que baja el renderizado de orderCart
    const delCart = () => {
        setDataCart(null)
    }

    //funcion que setea el state del carrito en canceled
    const cancelCart = (element) => {
        
        if( element.state==='created' || element.state==='processing' ) {
            return authAxios.put(`orders/cancel/${element.id}`, {state: element.state})
            .then(()=> (alert('carrito cancelado')))
            .then(()=> setFlag(!flag))
            .catch(()=> console.log('error'))
        }
        else return alert('El carrito debe tener estado create o processing para cancelarlo')
    }

    
    return (
    <> 
        <div>
            <h1 className={s.h1}>Tabla de Ordenes</h1>
            <table className = {`table ${s.table}`}>
                <thead className="table table-hover table-dark  ">
                    <tr>
                        <th scope="row">Número de carrito</th>
                            <th scope="row">
                                <select className={`custom-select ${s.select}`}>
                                    <option onClick={()=>getAll()}>Todos los Carritos</option>
                                    <option onClick={()=>searchByState('cart')}>Vacio</option>
                                    <option onClick={()=>searchByState('created')}>Creado</option>
                                    <option onClick={()=>searchByState('processing')}>Procesando</option>
                                    <option onClick={()=>searchByState('canceled')}>Cancelado</option>
                                    <option onClick={()=>searchByState('completed')}>Completado</option>                  
                                </select>
                            </th>
                        <th scope="row">Usuario</th>
                        <th scope="row">Email</th>
                        <th scope="row">Creado</th>
                        <th scope="row">Modificado</th>
                        <th></th>
                    </tr>

                { display instanceof Array ? display.map(element => (
                   
                    <tr className={tableRowStyle(element.state)}>
                        <th className={s.idCart}>
                            {element.id}
                            <button onClick={()=>(idCart(element.id))} className={s.button}>
                                 <img className={s.more}  src={imgs.more} alt="show_more"/>
                            </button>
                        </th>
                        <th typeof= 'button'>{element.state}</th>
                        <th typeof='button' onClick={()=>searchById(element.userId)}>{element.user.first_name}</th>
                        <th typeof='button'>{element.user.email}</th>
                        <th>{splitter(element.createdAt)}</th>
                        <th>{splitter(element.updatedAt)}</th>
                        <th>
                            <img src={imgs.trash} width='28' onClick={()=> cancelCart(element)}
                            alt='Cancelar carrito' title='cancelar carrito' type='button'/>
                        </th> 
                    </tr>))
                     : 
                    <tr className={tableRowStyle(display.data.state)}>
                        <th>{display.data.id}</th>
                        <th>{display.data.state}</th>
                        <th  typeof='button'>{display.data.user.first_name}</th>
                        <th  typeof='button'>{display.data.user.email}</th>
                        <th>{splitter(display.data.createdAt)}</th>
                        <th>{splitter(display.data.updatedAt)}</th>
                    </tr>}
                </thead >
            </table>
            <OrderCart data={dataCart} delCart={delCart}/>
        </div>
    </>
)}



export default OrderTable;

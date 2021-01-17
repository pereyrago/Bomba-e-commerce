import React, { useState, useEffect } from 'react';
import authAxios from '../axios'
import ProductForm from './ProductForm';
import s from "./../styles/ProductList.module.css";
import imgs from "./imgs/imgs.js";
import swal from 'sweetalert'
const ProductList = (props) =>{

	let [ product, setProduct] = useState({})
	let [flag , setFlag] = useState({uno: false, dos: false})

	useEffect(() => {
       if(flag.dos === true){
          props.submit()
}
	},[flag.dos])

	

	let reset = (e) =>{
		e.preventDefault()
		swal("¿Estás seguro que querés borrar el producto?", {
			buttons: ["Cancelar", "Confirmar"],
		  })
		.then((ans)=>ans && authAxios.delete(`products/delete/${props.id}`))
		.then((ans) => ans && (setFlag({...flag ,dos: true}), swal('Listo', 'Tu producto fué eliminado','success')))
			
		.catch(()=> console.log('fallo'))		
	}

	let update = (e) => {
		e.preventDefault()
		authAxios.get(`products/${props.id}`)
		.then( res => {
			setProduct(res.data)
			setFlag({...flag ,uno: true})
			
		})			
	}
	
	return(
			<div>
				<h2>{props.name}</h2>
				<img src={props.imgUrl} alt = ''/>				

				<button className={s.botonImg} onClick={update}><img src={imgs.create} alt='Guardar' className={s.icon}/></button>								
				{ flag.uno ? 
					<ProductForm  flag={props.flag} setFlag={setFlag} id={product.id} name={product.name} description={product.description}
					 price={product.price} stock={product.stock} imgUrl={product.images.map(img=>[img.id , img.imgUrl])} 
					 catName={product.catName}   categories={product.categories.map(cat=>cat.id)}	/> :	null
				}
				<button className={s.botonImg} onClick={reset}> <img src={imgs.del} className={s.icon} alt=''/> </button>
			</div>
		)
}

export default ProductList
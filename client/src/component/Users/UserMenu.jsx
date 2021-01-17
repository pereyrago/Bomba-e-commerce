import React, {useState,useEffect} from 'react';
import s from "./../../styles/UserMenu.module.css";
import imgs from './../imgs/imgs'
import {useSelector, useDispatch, connect} from 'react-redux'
import {updateUserPhoto, getAllUserOrder, verReviewUser} from './../../store/actions/index'
import ReviewHistory from "./ReviewHistory";
import {NavLink} from 'react-router-dom'
import RestartPass from './RestartPass'

function UserMenu ({getAllUserOrder, verReviewUser}){

    const selector = useSelector(store => store.activeUser)
    console.log("INFO SELECTOR", selector)
    const {id , first_name, image, last_name, email, rol, googleId, facebookId}= selector   
    const dispatch = useDispatch()
    const[flag,setFlag]=useState(false);
    const[flagReview, setFlagReview]=useState(false);
    const[ passRestart, setPassRestart]=useState(false); 

    
    //funcion que sube foto de un usuario
    const subirImagen = (img)=>{
        const form= new FormData()        
        form.append('image', img[0] )
        return dispatch(updateUserPhoto(id, form))
    }
    
    useEffect(() => {

    }, [flagReview, passRestart])
    
    
    //definición de las imagenes de usuario
    const  secondImg='https://media.discordapp.net/attachments/755566230412329011/780420765489037342/bomba.png'
    const img = image && image.imgUrl
    
    const imagen = (image) => {
        if(image.imgUrl[0]==='/'){
            return `http://localhost:3001${image.imgUrl}`
        }
        else return image.imgUrl
    }


    //variable para bindear img con input file
    let binder;


    return(
    <div className={s.container}>
        <div className={s.user}>

            <div>
                <h1 className={s.titulo}>Panel de usuario</h1>                
            </div>
            <div>
                <img className={s.fotoPerfil} src={image ? imagen(image) : secondImg } alt="sin imagen"/>
                <input style={{display:"none"}} type="file" ref={fileInput => binder = fileInput}
                onChange={(e)=> subirImagen(e.target.files)} name='image' />
                <img type='button' onClick={()=> binder.click()} height='20' src={imgs.photo}/>                
            </div>        
            <div className={s.fotoContaniner}>
                <a className={s.nombre}>  {first_name || 'Usuario invitado'}</a>
                <a className={s.nombre}>{last_name}</a>
                <p className={s.mail}>{email}</p>

            </div>
            <div>
            <NavLink to="/users/historial" ><button className={s.botonText} onClick= {()=> getAllUserOrder(id)}>Historial de compras</button></NavLink>
                {
                last_name ?
                <div>        
                    <NavLink to='/users/edit'><button className={s.botonText} onClick={()=>setFlag(!flag)}>Actualizá tus datos</button></NavLink>
                    {facebookId || googleId ? null :
                     <button className={s.botonText} onClick={()=>(setPassRestart(true))}>Editar contraseña</button> 
                     }
                    
                    {passRestart ? <RestartPass setPassRestart={setPassRestart}/> : null }
                    <button className={s.botonText} onClick={()=>(setFlagReview(true), verReviewUser(id))}>Mis reviews</button>
                    {flagReview ? <ReviewHistory setFlagReview = {setFlagReview}/> : null}
                    
                </div> 
            : null }
            </div>
        </div>
    </div>

    )
}

export default connect (null, {getAllUserOrder, verReviewUser})(UserMenu)


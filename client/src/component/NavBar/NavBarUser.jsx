import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import s from './../../styles/NavBarUser.module.css'
import jwt from 'jwt-simple'

export default function NavBarUser ({logOut, setFlag, flag}) {
    const selector = useSelector(store => store.activeUser)
    const {first_name, last_name, image} = selector
    let userRol;
    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
    if(decoded){
     userRol=decoded.user.rol
    }
    const  secondImg='https://media.discordapp.net/attachments/755566230412329011/780420765489037342/bomba.png'
   
    
    const imagen = (image) => {
        if(image.imgUrl[0]==='/'){ 
            return `http://localhost:3001${image.imgUrl}`
        }
        else return image.imgUrl 
    }
    
    return (
    <>{userRol==='user' ? 
        <>
            <div className={`dropdown-toggle ${s.container}`} role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img className={s.image} src={image ? imagen(image): secondImg}  alt="imagen"/>
                <p className={s.nick}>{first_name}</p>
            </div>
            <div  className="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                <Link style={{textDecoration:'none'}} to='/users/menu' >
                    <button className={`dropdown-item ${s.select}`}>Mi Perfil</button>
                </Link>
                <button className={`dropdown-item ${s.select}`} onClick={()=>(logOut(), setFlag(!flag))}>Log out</button>
            </div>
        </>            
    : userRol==='admin' ?
        <>
            <div className={`dropdown-toggle ${s.container}`} role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img className={s.image} src={image ? imagen(image): secondImg}  alt="imagen"/>
                <p className={s.nick}>{first_name}</p>
            </div>
            <div  className={` dropdown-menu ${s.menu}`} aria-labelledby="dropdownMenuButton">
                <Link style={{textDecoration:'none'}} to='/admin' >
                    <button className={`dropdown-item ${s.select}`}>Panel de Admin</button>
                </Link>
                <Link style={{textDecoration:'none'}} to='/users/menu' >
                    <button className={`dropdown-item ${s.select}`}>Mi Perfil</button>
                </Link>
                <button className={`dropdown-item ${s.select}`} onClick={()=>(logOut(), setFlag(!flag))}>Log out</button>
            </div>
        </>         
    : 
        <>
            <Link  className={s.texto} to="/users/create" > 
                <button className={s.botonTexto}>Register</button>
            </Link>
            <Link  className={s.texto} to="/login" > 
                <button className={s.botonText}>Login</button>
            </Link>
        </>  }
    </>
    )
}

                   
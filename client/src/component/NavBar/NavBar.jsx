import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import s from "./../../styles/NavBar.module.css";
import imgs from "../imgs/imgs.js";
import {NavLink, Link } from 'react-router-dom';
import GetCategories from './Categorias/GetCategories'
import {setProductCatalogAll , setActiveUser, openCart, getNumProducts} from '../../store/actions/index.js';
import {useSelector, useDispatch, connect} from 'react-redux'
import jwt, { decode } from 'jwt-simple';
import { useEffect } from 'react';
import { useState } from 'react';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Badge from '@material-ui/core/Badge';
import NavBarUser from './NavBarUser'





function NavBar () {

    
    const dispatch = useDispatch()
    const numProd = useSelector(state => state.numProducts)


    //checkeo de datos del token
    let userId;
    let userRol
    if(localStorage.getItem('token')) var decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
    if(decoded){
        userId= decoded.user.id
        userRol=decoded.user.rol}

    const[flag,setFlag]=useState(false)
       
    //state
   
    
    useEffect(()=>{
            
    },[flag])

    useEffect(()=>{
        userId && dispatch(setActiveUser(userId))
        dispatch(getNumProducts(userId))

    },[])

    //función de deslogueo
    const logOut= ()=>{
        localStorage.removeItem('token')
        return  window.location.assign('/')
    }
    // estado para activar la sideBar
    const [sideBar, setSideBar] = useState(false)
    const toggleSideBar = () =>  setSideBar(!sideBar)
    

    const allProducts = ()=> {
        return  dispatch(setProductCatalogAll())
    }


 


    return (
        <>
            <button className={s.sideBarButton} onClick={toggleSideBar}><MenuOutlinedIcon/></button>
            <nav className={s.nav} style={sideBar ? {left: '0'} : {}}>
                <div className={s.bombaCont} to='/'>
                    <button className={s.backButton} onClick={toggleSideBar}>
                        <ArrowBackOutlinedIcon/>
                    </button>
                    <img className={s.bomba} src={imgs.bomba} alt="Logo"/>
                    <h2 className="animate__animated animate__bounce">bomba</h2>
                </div>             
                <div className={s.menu}>                    
                    <NavLink className={s.texto} to='/'> Inicio </NavLink>                    
                    <a className={`dropdown${s.dropdown}`}>
                        <a className={ `dropdown-toggle ${s.texto}`} role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categorias
                        </a>
                        <a className={`dropdown-menu ${s.dropdown}`} aria-labelledby="dropdownMenuLink">
                             <GetCategories />
                        </a>
                    </a>                    
                    <NavLink className={s.texto} to="/SobreNosotros/" >Sobre Nosotros</NavLink>                      
                    <NavLink className={s.texto} to="/catalogo/" onClick={()=>allProducts()}  >Catalogo</NavLink>
                </div>  
                <SearchBar className={s.search}/>
                <div className={s.cart} onClick={() => dispatch(openCart(true))} > 
                    <div className={s.carritoCont}>
                    <Badge badgeContent={numProd} color="secondary">
                        <ShoppingCartIcon style={{ fontSize: 30, color: deepOrange[100]}}/>
                    </Badge>           
                    </div>
                </div>                            
                <div className={s.user}>
                     <NavBarUser logOut={logOut} setFlag={setFlag} flag={flag}/>
                </div>
               
            </nav>
        </>
    )
}


export default NavBar;

                    
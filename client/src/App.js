import React, { useEffect, useState} from 'react';
import CategoriesCRUD from './component/AdminPanel/Categorias/CategoriesCRUD'
import NavBar from './component/NavBar/NavBar';
import CrudProduct from "./component/AdminPanel/Productos/CrearProducto/CrudProduct.jsx";
import { Route, Switch} from 'react-router-dom';
import Product from './component/Catalogo/ProductCard/Product/Product'
import ContainerCatalogo from './component/ContainerCatalogo.jsx'
import Header from "./component/HomePage/Header/Header.jsx";
import SobreNosotros from './component/NavBar/SobreNosotros/SobreNosotros';
import Admin from './component/AdminPanel/Admin.jsx'
import PostDelCatProd from './component/AdminPanel/CatProd/PostDelCatProd';
import {connect} from 'react-redux';
import CrudUser from './component/Users/CrudUser.jsx'
import EditUser from './component/Users/EditUser.jsx'
import DeleteUser from './component/Users/DeleteUser.jsx'
import OrderTable from './component/AdminPanel/OrdenesDeCompra/OrderTable';
import Order from './component/Order';
import jwt from 'jwt-simple'
import Carrito from './component/Carrito/Carrito';
import OrderCart from './component/AdminPanel/OrdenesDeCompra/OrderCart';
import CarouselTefi from './component/HomePage/Carrusel/Carousel';
import Login from './component/Login/Login'
import HistorialDeCompras from './component/Users/HistorialDeCompra'
import UserMenu from './component/Users/UserMenu';
import Checkout from './component/Checkout/Checkout'
import Success from './component/Checkout/Success'
import EditRol from './component/AdminPanel/AdmUsers/EditRol';
import MercadoPago from './component/Checkout/MercadoPago';
import Footer from './component/HomePage/Footer/Footer';
import ContactForm from './component/HomePage/Footer/ContactForm';
import LoginAuth from './component/Login/LoginAuth'
import SendPass from './component/Users/SendPass'
import ResetPassowordEmail from './component/Users/ResetPassowordEmail'


function App({productInfo, opencart}) {
   const [ authorization, setAuthorization] = useState(false)
const  admin = () =>{
   let decoded;
   if(localStorage.getItem('token'))  decoded = jwt.decode(localStorage.getItem('token'), "ecommerce-ft06-g07");
   if(decoded){ 
      if(decoded.user.rol === 'admin'){
       
         setAuthorization(true)
    }}
}
useEffect(()=>{ 
   admin()
}, []) 
  
  return (
    <>   
      <NavBar />
      <Footer/>
      <Switch>
      <Route path='/SobreNosotros/'>
         <Header/>
        <SobreNosotros/>
        { opencart ? <Carrito/> : null}
      </Route> 
      <Route path='/contact/'>
         <Header/>
        <ContactForm/> 
      </Route>
      <Route path='/catalogo/search' >
         <Header/>
        <ContainerCatalogo  />
        { opencart ? <Carrito/> : null}
      </Route>
      <Route path='/catalogo/' exact >
         <Header/>
        <ContainerCatalogo />
        { opencart ? <Carrito/> : null}
        </Route>
      <Route path='/catalogo/selected' exact >
         <Header/>
        <ContainerCatalogo />
        { opencart ? <Carrito/> : null}
        </Route>  
      <Route path='/products/'>
         <Header/>
         
         <Product products={productInfo} /> 
         { opencart ? <Carrito/> : null} 
        
      </Route>   
      <Route path='/admin/' exact>
         { authorization ? <Admin/> : <CarouselTefi /> }
         { opencart ? <Carrito/> : null}
      </Route>        
      <Route path='/admin/prodCategories'>  
      { authorization ? <PostDelCatProd/>  : <CarouselTefi /> }   
      { opencart ? <Carrito/> : null}              
      </Route>
      <Route path='/admin/ordertable' exact>
      { authorization ? <OrderTable/>  : <CarouselTefi /> } 
      { opencart ? <Carrito/> : null}     
      </Route>
      <Route path='/admin/ordercart' exact>
         <OrderCart/>
         { opencart ? <Carrito/> : null}
      </Route>
      <Route path='/admin/categories' exact>
      { authorization ? <CategoriesCRUD/> : <CarouselTefi /> } 
      { opencart ? <Carrito/> : null}    
      </Route>
      <Route path='/admin/products' exact>
      { authorization ? <CrudProduct/>  : <CarouselTefi /> }
      { opencart ? <Carrito/> : null}
      </Route>
      <Route path='/admin/controlUser' exact>
         <EditRol/>
         { opencart ? <Carrito/> : null}
      </Route>
      <Route path='/users/create' exact>
         <Header/>
         <CrudUser/>
         { opencart ? <Carrito/> : null}
      </Route>
      <Route path='/users/edit' exact>
         <Header/>
         <EditUser/>
         { opencart ? <Carrito/> : null}
      </Route>
      <Route path='/users/search' exact>
         <DeleteUser/>
         { opencart ? <Carrito/> : null}
      </Route>
      <Route path='/users/menu' exact>
         <Header/>
         <UserMenu/>
         { opencart ? <Carrito/> : null}
      </Route>
      <Route path='/users/historial'>
         <Header/>
         <HistorialDeCompras/>
         { opencart ? <Carrito/> : null}
      </Route>
      <Route path='/cart' exact>
         <Header/>
         <Carrito/>
         { opencart ? <Carrito/> : null}
      </Route> 
      <Route path='/order' exact>
         <Header/>
         <Order/>
      </Route> 
      <Route path='/' exact>
         <Header/>
        <CarouselTefi/> 
        { opencart ? <Carrito/> : null}     
      </Route>
        <Route path='/cart' exact>
         <Header/>
         <Carrito/>
      </Route> 
      <Route path='/login' exact>
         <Header/>
         <Login/>
         { opencart ? <Carrito/> : null}
      </Route> 
      <Route path='/checkout' >
         <Header/>
         <Checkout />
      </Route>  
      <Route path='/LoginAuth' exact>
         <Header/>
         <LoginAuth />
         { opencart ? <Carrito/> : null}
      </Route>     
      <Route path='/success' exact>
         <Header/>
         <Success />
         { opencart ? <Carrito/> : null}
      </Route>   
      <Route path='/pago/checkout' exact>
         <Header/>
         <MercadoPago />
         { opencart ? <Carrito/> : null}
      </Route>  
      <Route path='/resetPass' exact>
         <Header/>
         <SendPass />
         { opencart ? <Carrito/> : null}
      </Route> 
      <Route path='/ResetPassowordEmail'>
         <Header/>
         <ResetPassowordEmail  />
         { opencart ? <Carrito/> : null}
      </Route>  

      
     </Switch>
     
    </>
  )
  }
const mapStateToProps = (state) => {
  return {
      productInfo: state.productInfo,
      opencart: state.opencart
  };
};
export default connect(mapStateToProps,null)(App);

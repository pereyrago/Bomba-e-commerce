import React from 'react';
import {Link} from "react-router-dom";
import s from './../../styles/Admin.module.css'


function Admin() {

      return (
          <div className = {s.admin}>
                  <Link to="/admin/categories/"><button className = {s.boton}> Categorías </button></Link>
                  <Link to="/admin/prodCategories/"><button className = {s.boton}> Asignar/Eliminar Categorías </button></Link>
                  <Link to="/admin/products/"><button className = {s.boton}> Productos </button></Link>
                  <Link to="/admin/orderTable/"><button className = {s.boton}> Tabla de Ordenes </button></Link>
                  <Link to="/admin/controlUser/"><button className = {s.boton}> Administrar Usuario </button></Link>
          </div>
      )
  };
  
  export default Admin;
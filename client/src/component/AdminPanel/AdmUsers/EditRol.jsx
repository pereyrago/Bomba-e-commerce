import React, {useState, useEffect} from 'react';
import s from './../../../styles/EditRol.module.css';
import authAxios from '../../../axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function EditRol () {

    const[users,setUsers]= useState([])
    const[refresh,setRefresh]= useState(false)

    function getAll(){
        authAxios.get('/users')
            .then(respuesta => setUsers(respuesta.data))
            .catch(error => alert ('No se encuentran Usuarios ' + error))       
    }

    function banear(userId){
        authAxios.put('/users/'+userId+"/banneado")
            .then(() => (Swal.fire('Usuario banneado','','success'), setRefresh(!refresh)))
            .catch(error => alert ('No se pudo bannear al Usuario ' + error))       
    }
    
    function desbanear(userId){
        authAxios.put('/users/'+userId+"/desbanneado")
            .then(() => (Swal.fire('Usuario desbanneado','','success'), setRefresh(!refresh)))
            .catch(error => alert ('El Usuario no se pudo desbannear ' + error)) 
                  
    }

    function resetPsw(userId){
        authAxios.put('/users/'+userId+"/passwordReset")
            .then(() => (Swal.fire('Solicitud de reset password éxitosa','','success'), setRefresh(!refresh)))
            .catch(error => alert ('No se pudo solicitar el reset del password ' + error))       
    }
   

    function toAdmin(userId){
        authAxios.put('/users/'+userId+"/toAdmin")
            .then(() => (Swal.fire('El usuario ahora es administrador','','success'), setRefresh(!refresh)))
            .catch(error => alert ('No se pudo modificar el usuario a Administrador ' + error))       
    }

    function toUser(userId){
        authAxios.put('/users/'+userId+"/toUser")
            .then(() => ( Swal.fire('El administrador ahora es usuario','','success'), setRefresh(!refresh)))
            .catch(error => alert ('No se pudo modificar el Administrador a Usuario' + error))       
    }

    useEffect(()=>{
        getAll()
    },[refresh])

    return (
        <div className={s.container}>
            <div className={s.tablaCont}>
            <div className={s.cont}>
                <Link to="/admin">
                    <button className={s.x}>x</button>
                </Link>
            </div>
                <table className={s.tabla}>
                    <thead>
                        <tr>
                        <th>Nombre y Apellido</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users ? users.map((user)=>
                            <tr>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{!user.ban ? <button className={s.boton} onClick={()=>banear(user.id)}>Bloquear</button> : <button className={s.boton} onClick={()=>desbanear(user.id)}>Desbloquear</button>}</td>
                                <td>{!user.reset ? <button className={s.boton}  onClick={()=>resetPsw(user.id)}>Reset Psw</button>: <button className={s.disabled} disabled>Reset Psw</button>}</td>
                                <td>{user.rol==="admin" ? <button  className={s.boton} onClick={()=>toUser(user.id)}>ToUser</button>:<button  className={s.boton} onClick={()=>toAdmin(user.id)}>ToAdmin</button>}</td>
                            </tr>
                        ): null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )}



export default EditRol;


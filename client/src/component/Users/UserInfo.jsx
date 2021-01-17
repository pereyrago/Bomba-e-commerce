import React from "react"
import authAxios from '../../axios'



function UserInfo({user}) {

    function HandleSubmit(){
        authAxios.delete('users/'+user.id)
        .then(
            ()=>{
                alert('el usuario se elimino correctamente')
            }
        )
    }
    return (
        <div>
            Usuario:{user.email}
            <button onClick={HandleSubmit}>Eliminar</button>
        </div>
    )
}

export default UserInfo;
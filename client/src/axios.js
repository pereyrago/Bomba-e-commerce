import axios from 'axios'

const authAxios = axios.create({
    baseURL: 'http://localhost:3001/', 
    headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        withCredentials: true
    }
})

export default authAxios
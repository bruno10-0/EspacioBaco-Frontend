import axios from "axios";

const instance = axios.create({
    baseURL:'https://espaciobacobackend.onrender.com',  /*http://localhost:3000/  */
    withCredentials:true
})

export default instance
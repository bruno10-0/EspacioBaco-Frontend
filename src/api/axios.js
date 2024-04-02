import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:3000/',  /*https://espaciobacobackend.onrender.com*/
    withCredentials:true
})

export default instance
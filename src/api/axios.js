import axios from "axios";

const instance = axios.create({
    baseURL:'https://espaciobacobackend.onrender.com',
    withCredentials:true
})

export default instance
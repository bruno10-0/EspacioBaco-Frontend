import CryptoJS from "crypto-js";
import {secretKey} from "../constants/secret-key.js"
export const dataDecrypt = (value) => {
 const bytes = CryptoJS.AES.decrypt(value,secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

};

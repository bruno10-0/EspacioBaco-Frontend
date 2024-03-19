import CryptoJS from "crypto-js";
import { ENCRYPTION_KEY_DATA } from "../constants/secret-key.js";

export const dataEncrypt = (value) => {
    return CryptoJS.AES.encrypt(JSON.stringify(value),ENCRYPTION_KEY_DATA).toString()
};

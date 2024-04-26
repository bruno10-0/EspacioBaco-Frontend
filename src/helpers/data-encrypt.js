import CryptoJS from "crypto-js";

export const dataEncrypt = (value) => {
    return CryptoJS.AES.encrypt(JSON.stringify(value),import.meta.env.VITE_ENCRYPTION_KEY_DATA).toString()
};

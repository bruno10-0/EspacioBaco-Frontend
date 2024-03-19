import CryptoJS from "crypto-js";
import { ENCRYPTION_KEY_TOKEN } from "../constants/secret-key.js";

export const encryptToken = (token) => {
  // Encriptar el token utilizando AES y la clave de encriptación proporcionada
  const encryptedToken = CryptoJS.AES.encrypt(
    token,
    ENCRYPTION_KEY_TOKEN
  ).toString();
  return encryptedToken;
};

import CryptoJS from "crypto-js";

export const encryptToken = (token) => {
  // Encriptar el token utilizando AES y la clave de encriptación proporcionada
  const encryptedToken = CryptoJS.AES.encrypt(
    token,
    import.meta.env.VITE_ENCRYPTION_KEY_TOKEN
  ).toString();
  return encryptedToken;
};

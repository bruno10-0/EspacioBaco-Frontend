import CryptoJS from "crypto-js";
import { ENCRYPTION_KEY_TOKEN } from "../constants/secret-key.js";

export const decryptToken = (encryptedToken) => {
  if (!encryptedToken) {
    throw new Error("Token no proporcionado");
  }

  try {
    const decryptedTokenBytes = CryptoJS.AES.decrypt(
      encryptedToken,
      ENCRYPTION_KEY_TOKEN
    );

    if (!decryptedTokenBytes) {
      throw new Error("No se pudo desencriptar el token");
    }

    // Convertir los bytes desencriptados a texto
    const decryptedToken = decryptedTokenBytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  } catch (error) {
    throw new Error("Error al desencriptar el token: " + error.message);
  }
};

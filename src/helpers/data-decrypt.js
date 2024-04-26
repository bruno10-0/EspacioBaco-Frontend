import CryptoJS from "crypto-js";

export const dataDecrypt = (value) => {
  if (!value) {
    throw new Error("Valor no proporcionado para desencriptar");
  }

  try {
    const bytes = CryptoJS.AES.decrypt(value,import.meta.env.VITE_ENCRYPTION_KEY_DATA);

    if (!bytes) {
      throw new Error("No se pudo desencriptar el valor");
    }

    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedValue);
  } catch (error) {
    throw new Error("Error al desencriptar el valor: " + error.message);
  }
};

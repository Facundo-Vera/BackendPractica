// ^importar JWT

import jwt from "jsonwebtoken";

//^ una funcion que me ayude a generar el token

export const generateToken = (userId) => {
  // retorne un token
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1h",
  });
};

//^ una funcion que me sirva para verificar un token

export const verifyToken = (token) =>{
    try {
        return jwt.verify(token , process.env.JWT_SECRET )
    } catch (error) {
        throw new Error("Token invalido o expirado")
    }
}
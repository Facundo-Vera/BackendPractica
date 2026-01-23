import { Router } from "express";
import { validateLoginUser, validateRegisterUser, validationCodeEmail, } from "../middlewares/validator.js";
import { login, logout, profile, register, verifyEmail } from "../controllers/auth.controller.js";
import {authenticate} from "../middlewares/auth.js"


const router = Router();


// Llega con /auth

//! RUTAS PUBLICAS

router.post('/register',validateRegisterUser(),register)
router.post('/login',validateLoginUser(),login)
router.post('/verify-email',validationCodeEmail(),verifyEmail)


//! RUTAS PRIVADAS

router.post('/logout' ,authenticate,logout)
router.get('/profile',authenticate,profile) //primero hacer la autenticacion para saber si esta logeado


export default router;
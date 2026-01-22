import { Router } from "express";
import { validateLoginUser, validateRegisterUser, validationCodeEmail, } from "../middlewares/validator.js";
import { login, register, verifyEmail } from "../controllers/auth.controller.js";



const router = Router();


// Llega con /auth

//! RUTAS PUBLICAS

router.post('/register',validateRegisterUser(),register)
router.post('/login',validateLoginUser(),login)
router.post('/verify-email',validationCodeEmail(),verifyEmail)


//! RUTAS PRIVADAS

// router.post('/logout')
// router.get('/profile') 


export default router;
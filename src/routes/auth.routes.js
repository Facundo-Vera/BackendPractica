import { Router } from "express";
import { validateLoginUser, validateRegisterUser, validationCodeEmail, } from "../middlewares/validator.js";



const router = Router();


// Llega con /auth

//! RUTAS PUBLICAS

router.post('/register',validateRegisterUser)
router.post('/login',validateLoginUser)
router.post('/verify-email',validationCodeEmail)


//! RUTAS PRIVADAS

// router.post('/logout')
// router.get('/profile') 


export default router;
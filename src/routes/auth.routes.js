import { Router } from "express";
import { validateLoginUser, validateRegisterUser } from "../middlewares/validator";



const router = Router();


// Llega con /auth

 router.post('/register',validateRegisterUser)
router.post('/login',validateLoginUser)
router.post('/verify-email',validationCodeEmail)
router.post('/logout')
router.get('/profile') 


export default router;
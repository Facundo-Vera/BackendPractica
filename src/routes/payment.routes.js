import { Router } from "express";
import { createPayment } from "../controllers/payment.controller.js";
import { authenticate } from "../middlewares/auth.js";



const router=Router()

router.post("/",authenticate,createPayment)

export default  router




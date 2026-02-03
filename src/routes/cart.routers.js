import { Router } from "express";
import {authenticate} from "../middlewares/auth.js"
import { agregarItem } from "../controllers/cart.contoller";

const router =Router()

router.post("/",authenticate,agregarItem)
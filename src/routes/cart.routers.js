import { Router } from "express";
import {authenticate} from "../middlewares/auth.js"
import { actualizarCantidad, agregarItem, borrarItem, traerItems } from "../controllers/cart.contoller";

const router =Router()

router.get("/" , authenticate,traerItems)
router.post("/",authenticate,agregarItem)
router.put("/:productoId",authenticate,actualizarCantidad)
router.delete("/:productoId",authenticate,borrarItem)
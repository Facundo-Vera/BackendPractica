import {Router} from "express";
import {check} from "express-validator";
import {authenticate} from "../middlewares/auth.js";
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductos } from "../controllers/product.controller";


const router =Router()

router.post("/" ,authenticate,crearProducto)
router.get("/",obtenerProductos)
router.post("/:id",actualizarProducto)
router.delete("/:id",eliminarProducto)



export default router;
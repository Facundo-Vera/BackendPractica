import { Router } from "express";
import { buscarProductos } from "../controllers/search.controller";

const router = Router()

router.get("/:termino",buscarProductos)


export default router;
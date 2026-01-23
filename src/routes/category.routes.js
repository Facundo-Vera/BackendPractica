import { Router } from "express";
import { check } from "express-validator";
import {
    actualizarCategoria,
  crearCategoria,
  traerCategorias,
} from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.js";
import { handleValidationErrors} from "../middlewares/validator.js"

const router = Router();

router.get(`/`, traerCategorias);
router.post(
  `/`,
  [authenticate, check("nombre", "EL nombre es obligatorio").notEmpty(),
    handleValidationErrors
  ],
  crearCategoria,
);

router.put(`/:id`,[authenticate,check("id","El id es reqerido y debe ser valido").isMongoId(),
    handleValidationErrors
],actualizarCategoria);
// router.delete(`/:id`); //Las categorias no se van a borrar solo se "desactivan" (cambie el estado a false)

export default router;

import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  traerCategorias,
} from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.js";
import { existeCategoriaPorId, handleValidationErrors, validarRolAdmin } from "../middlewares/validator.js";

const router = Router();

router.get(`/`, traerCategorias);
router.post(
  `/`,
  [
    authenticate,
    //validacion admin 
    validarRolAdmin,
    check("nombre", "EL nombre es obligatorio").notEmpty(),
    handleValidationErrors,
  ],
  crearCategoria,
);

router.put(
  `/:id`,
  [
    authenticate,
    check("id", "El id es reqerido y debe ser valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    check("nombre","El nombre no puede estar vacio").notEmpty(),  
    handleValidationErrors,
  ],
  actualizarCategoria,
);

router.delete(`/:id`,[
  authenticate,
   check("id", "El id es reqerido y debe ser valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
        handleValidationErrors,
],eliminarCategoria); //Las categorias no se van a borrar solo se "desactivan" (cambie el estado a false)

export default router;

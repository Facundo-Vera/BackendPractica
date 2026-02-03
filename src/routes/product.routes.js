import { Router } from "express";
// import {check} from "express-validator";
import { authenticate } from "../middlewares/auth.js";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductos,
} from "../controllers/product.controller.js";
import { check } from "express-validator";
import { handleValidationErrors, ValidarIdProducto } from "../middlewares/validator.js";

const router = Router();


router.get("/", obtenerProductos);
router.post(
  "/",
  [
    authenticate,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("categoria")
      .notEmpty()
      .withMessage("La categoria es obligatoria")
      .isMongoId()
      .withMessage("no es un id de mongo valido"),
    check("usuario")
      .notEmpty()
      .withMessage("El usuario es obligatorio")
      .isMongoId()
      .withMessage("Debe ser un id de mongo valido"),
      handleValidationErrors
  ],
  crearProducto,
);
router.put("/:id", authenticate, actualizarProducto);
router.delete(
  "/:id",
  [
    authenticate,
    check("Id", "NO es un id valido").isMongoId(),
    check("id").custom(ValidarIdProducto),
  ],
  eliminarProducto,
);

export default router;

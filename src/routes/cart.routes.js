import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  actualizarCantidad,
  agregarItem,
  borrarCarrito,
  borrarItem,
  traerItems,
} from "../controllers/cart.controller.js";
import { check } from "express-validator";
import {
  handleValidationErrors,
  ValidarIdProducto,
} from "../middlewares/validator.js";

const router = Router();

router.get("/", authenticate, traerItems);
router.post(
  "/",
  [
    authenticate,

    check("productoId").custom(ValidarIdProducto),
    check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
    check("cantidad", "La cantidad debe ser mayor a 0").isInt({ min: 1 }),
    handleValidationErrors,
  ],
  agregarItem,
);
router.put(
  "/:productoId",
  [
    authenticate,
    check("productoId", "Debe enviar el id").notEmpty,
    check("productoId", "Debe ser un id valido").isMongoId(),
    handleValidationErrors,
  ],
  actualizarCantidad,
);
router.delete("/:productoId", authenticate, borrarItem);
router.delete("/", authenticate, borrarCarrito);

export default router;

import { Router } from "express";
import { createOneTask, deleteOneTask, getTask, updateOneTask } from "../controllers/task.controller.js";
import { validateCreateTask, validateUpdateTask , validateDeleteTask } from "../middlewares/validator.js";


const router = Router();

router.get ("/",getTask)
router.post ("/createTask", validateCreateTask ,createOneTask)
router.put ("/updateTask/:id", validateUpdateTask ,updateOneTask) //?ruta con parametro 
router.delete ("/deleteTask/:id", validateDeleteTask ,deleteOneTask)

export default router;
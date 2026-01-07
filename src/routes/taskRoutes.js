import { Router } from "express";
import { createOneTask, deleteOneTask, getTask, updateOneTask } from "../controllers/task.controller.js";


const router = Router();

router.get ("/",getTask)
router.post ("/createTask",createOneTask)
router.put ("/updateTask/:id",updateOneTask) //?ruta con parametro 
router.delete ("/deleteTask/:id",deleteOneTask)

export default router;
//?check me permite acceder a los campos que quiero validar
//?los errores se va a ir sumando a un array para mandarlo en la respuesta
import { check, validationResult } from "express-validator";
import Task from "../models/task.js";


//*Funcion que meneja el resultado de las validaciones

const handleValidationErrors = (req, res, next) => {
  //voy a preguntarme si hay errores

  const errors = validationResult(req); //?atraopa errores

  if (!errors.isEmpty()) {
    //si hay errores los mando en la respuesta al cliente
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  //si no hay errores entoces indico que el flujo continue al controlador

  next();
};

//*Validacion para crear una tarea

const validateCreateTask = [
  check("title")
    .notEmpty()
    .withMessage("El titulo es obligatorio") //~valido que el titulo no puede estar vacio
    .isString()
    .withMessage("El campo tiene que se un string")
    .isLength({ min: 5, max: 50 })
    .withMessage("El titulo debe tener entre 5 y 50 caracteres"), //~minimo de caracteres y maximo

  check("description")
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .isString()
    .withMessage("El campo tiene que se un string")
    .isLength({ min: 5, max: 500 })
    .withMessage("La descripcion debe tener entre 5 y 500 caracteres"),
    handleValidationErrors //&si hay algun error se ejecuta la funcion y manda los errores al cliente
];

const validateTaskById = async (value) =>{
    const taskById = await Task.findById(value)
   if (!taskById){
    throw new Error("La tarea no existe ") //?arroja un nuevo error al array de errores
   } 
}


const validateUpdateTask= [
     
    check("id")
    .isMongoId().withMessage("Envia un ID valido")
    
    .custom(validateTaskById)
    ,

    handleValidationErrors
]

const validateDeleteTask =[
    check("id")
    .isMongoId().withMessage("Envia un ID valido")
     .custom(validateTaskById)
    ,
    handleValidationErrors
]

export { validateCreateTask , validateUpdateTask,validateDeleteTask};

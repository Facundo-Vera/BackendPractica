import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import Categoria from "../models/Category.js";
import Producto from "../models/Product.js";

//armar una función que maneje el resultado de las validaciones
const handleValidationErrors = (req, res, next) => {
  // Voy a preguntarme si NO hay errores

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores los mando en la respuesta al cliente
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  // Si no hay errores entonces indico que el flujo continue al controlador
  next();
};

//!Funciones de validación

const validateEmailNotExists = async (email) => {
  const userByEmail = await User.findOne({ email }); //Busca un usuario cuyo campo email coincida con el email recibido
  if (userByEmail) {
    throw new Error("El correo electrónico ya está registrado.");
  }
};

//^ 1 - Validación de registro

const validateRegisterUser = () => [
  check("username")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .isString()
    .withMessage("El campo tiene que ser un string")
    .isLength({ min: 1, max: 30 })
    .withMessage("El nombre debe tener entre 1 y 30 caracteres")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user && user.username === value) {
        throw new Error("El usuario ya existe");
      }
    }),

  check("email")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .isEmail()
    .withMessage("Ingresá un correo electrónico válido.")
    .custom(validateEmailNotExists),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      "Debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número",
    ),

  handleValidationErrors,
];
//^ 2 - Validación de Login

const validateLoginUser = () => [
  check("email")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .isEmail()
    .withMessage("Ingresá un correo electrónico válido.")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user?.emailVerified) {
        throw new Error("El usuario ya está verificado");
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isString()
    .withMessage("El campo tiene que ser un string"),

  handleValidationErrors,
];

//^ 3 - Validación del código de verificación

const validationCodeEmail = () => [
  check("verificationCode")
    .notEmpty()
    .withMessage("El código de verificación es obligatorio.")
    .isString()
    .withMessage("El campo tiene que ser un string")
    .isLength({ min: 6, max: 6 })
    .withMessage(
      "El código de verificación no es válido debe tener 6 caracteres .",
    ),
];

//Validar ID

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Eror(`El id ${id} no existe`);
  }
  if (!existeCategoria.estado) {
    throw new Eror(`La categorias ${existeCategoria.nombre} no esta activa`);
  }
};

//validar rol Admin

const validarRolAdmin = (req, res, next) => {
  const rol = req.user.role;

  if (rol !== "admin") {
    return res.status(401).json({
      ok: false,
      message: "No tiene permisos para realizar esta accion ",
    });
  }
  next();
};
//Validar producto por id

const ValidarIdProducto = async (id) => {
  const productoPorId = await Producto.findById(id);

  if (!productoPorId) {
    throw new Error("No existe el producto");
  }
  if(!producto.disponible){
    throw new Error("EL producto no esta disponible");
  }
 
};

//Validar tipo de archivo
const validateImageFile = (req, res, next) => {
  if (!req.files || req.files.archivo) {
    return res.status(400).json({
      ok: false,
      message: "No hay  archivo",
    });
  }

  let file = req.files.archivo;
  const formatosValidos = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (!formatosValidos.includes(file.mimetype)) {
    return res.status(400).json({
      ok: false,
      message: "Solo se permiten imagenes (JPG,PNG,GIF,WEBP)",
    });
  }
  next();
};

export {
  handleValidationErrors,
  validateRegisterUser,
  validateLoginUser,
  validationCodeEmail,
  existeCategoriaPorId,
  validarRolAdmin,
  ValidarIdProducto,
  validateImageFile,
};

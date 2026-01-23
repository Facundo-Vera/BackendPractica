import { Schema, model } from "mongoose";

const CategoriasSchema = Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"], //Validacion para la base de datos
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },

  //Saber el usuario que creo la categoria
  //Este campo debe guardar el ID del modelo de usuario 
  usuario:{
    type: Schema.Types.ObjectId,
    ref:"User"
  }
});

export default model("Categoria",CategoriasSchema);

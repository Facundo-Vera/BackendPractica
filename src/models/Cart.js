import { Schema, model } from "mongoose";

//Items del carrito
//Id producto
//Cantidad
//Precio unitario

const CatrItemSchema = new Schema({
  producto: {
    type: Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1,
  },
  precioUnitario: {
    type: Number,
    required: true,
  },
});

//Carrito
//Id del usuario
//Items
//Total
//Fecha de creacion

const cartSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [CatrItemSchema], //Contiene el esquema de items
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: ture },
);


cartSchema.method.calcularTotal= function () {

    this.total= this.items.reduce((suma,item)=>suma + item.precioUnitario * item.cantidad,0)
    return this.total;

};

export default model("Cart" ,cartSchema)
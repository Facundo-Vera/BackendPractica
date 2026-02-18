import mongoose, { mongo } from "mongoose";
import Producto from "../models/Product.js";

const { ObjectId } = mongoose.Types;

const buscarProductos = async (req, res) => {
  const { termino } = req.params;

  const esMongoId = ObjectId.isValid(termino); //validamos que sea un id de mongo

  //buscar por ID de producto

  if (esMongoId) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre",
    );

    return res.satus(200).json({
      results: producto ? [producto] : [],
    });
  }

  //buscar nombre de producto por termino

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate("categoria", "nombre");

  //total de registros que encontro
  const total = await Producto.countDocuments({
    nombre: regex,
    estado: true,
  });

  res.status(200).json({
    total,
    resulta: productos,
  });
};

export { buscarProductos };

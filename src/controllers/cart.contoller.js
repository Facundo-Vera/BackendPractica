import Cart from "../models/Cart.js";
import Producto from "../models/Product.js";

//Obtener carrito de usuario
//Agregar item al carrito

const agregarItem = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;

    //si en la request viene los datos
    if (!productoId || !cantidad) {
      return res.status(400).json({
        error: "Debe proporcionar productoId y cantidad",
      });
    }

    //cantidad es mayor que 0
    if (cantidad < 1) {
      return res.status(400).json({
        ok: false,
        message: "la cantidad debe ser mayor a 0",
      });
    }

    //validar el producto ------------------------
    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
      });
    }
    if (!producto.disponible) {
      return res.status(400).json({
        ok: false,
        message: "Producto no disponible",
      });
    }
    //--------------------------------------------

    //Validar el usuario

    let cart = await Cart.findOne({ usuario: req.user._id });

    //Si no existe lo creo
    if (!cart) {
      cart = new Cart({ usuario: req.user._id, items: [] });
    }

    //Si existe busco el id del producto en los items
    const itemExiste = cart.items.find(
      (item) => item.producto.toString() === productoId,
    ); //traigo todo los datos del producto

     //si encontramos el item en el carrito
    if (itemExiste) {
      itemExiste.cantidad += cantidad;
    }else{
        cart.items.push({
            producto:productoId,
            cantidad,
            precioUnitario:producto.precio
        })
    }

    cart.calcularTotal()
    await cart.save()

   const cartPopulate = await cart.populate("items.producto")

   res.json(cartPopulate)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Eliminar item del carrito
//Actualizar cantidad
//Vaciar carrito

export {agregarItem};
import Cart from "../models/Cart.js";
import Producto from "../models/Product.js";

//Obtener carrito de usuario

const traerItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ Usuario: req.user._id }).populate(
      "items.producto",
    ); //buscamos un carrito con el id de usuarioy si lo encuentra nos trae los datos de los productos
    res.json(cart || { items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
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
    } else {
      cart.items.push({
        producto: productoId,
        cantidad,
        precioUnitario: producto.precio,
      });
    }

    cart.calcularTotal();
    await cart.save();

    const cartPopulate = await cart.populate("items.producto");

    res.json(cartPopulate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Eliminar item del carrito
const borrarItem = async (req, res) => {
  try {
    const { productoId } = req.params;

    const cart = await Cart.findOne({ Usuario: req.user._id });
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    cart.items = cart.items.filter(
      (item) => item.producto.toString !== productoId,
    ); // nuevo array con los productos menos el que saque

    cart.calcularTotal();

    await cart.save();

    const cartPopulate = await cart.populate("items.producto");

    res.json(cartPopulate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Actualizar cantidad

const actualizarCantidad = async (req, res) => {
  try {
    const { productoId } = req.params;
    const { cantidad } = req.body;

    if (!cantidad || cantidad < 1) {
      return res.status(400).json({ error: "La cantidad debe ser mayor a 0" });
    }

    const cart = await Cart.findOne({ usuario: req.user_.id });

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const item = cart.items.find(
      (item) => item.producto.toString() === productoId,
    );

    if (!item) {
      return res
        .status(404)
        .json({ error: "Item no encontrado en el carrito" });
    }

    item.cantidad = cantidad; //cantidad neuva que viene en el cuerpo

    cart.calcularTotal();

    await cart.save();

    const cartPopulate = await cart.populate("items.producto");
    res.status(200).json(cartPopulate);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//Vaciar carrito

const borrarCarrito = async (req,res) =>{
  try {
    const  cart = await Cart.findOne({usuario:req.user._id})
    if(!cart){
      return res.status(404).json({error:"Carito no encontrado"});
    }
    cart.items=[]
    csrt.total=0
    await cart.save()

    res.status(200).json8({
      ok:true,
      message:"Carrito vacio",
      cart

    })
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

export { agregarItem, traerItems, borrarItem, actualizarCantidad,borrarCarrito };

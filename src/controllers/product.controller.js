import Producto from "../models/Product.js";

//*Obtener lista de productos

const obtenerProductos = async (req, res) => {
  //  const productos = await Producto.find({estado:true})
  //  .populate("usuario","username email role")
  //  .populate("categoria","nombre")

  //  const total = await Producto.countDocuments({estado:true})

  // promesa total
  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),

    Producto.find({ estado: true })
      .populate("usuario", "username email role")
      .populate("categoria", "nombre"),
  ]);

  res.json({
    total,
    productos,
  });
};

const crearProducto = async (req, res) => {
  const { precio, categoria, descripcion, img } = req.body;

  const nombre = req.body.nombre.toUpperCase; //*los nombre de productos se guardan en mayuscula

  //*Validar si existe un porducto con el mismo nombre

  const productoDB = await Producto.findOne({ nombre });

  if (nombre) {
    return res.status(400).json({
      message: `El producto con el nombre ${productoDB.nombre} ya existe`,
    });
  }

  //*Objeto con datos a guardar
  const data = {
    nombre,
    categoria,
    precio,
    descripcion,
    usuario: req.user.id,
  };

  //* genera un documento con los datos de data
  const producto = new Producto(data);

  await producto.save();

  res.status(201).json({
    ok: true,
    message: `EL producto ${data.nombre} se guardo correctamente`,
  });
};

//actualizar producto


const actualizarProducto = async (req,res) => {

    const {id} = req.params 


    const {nombre,precio,categoria,descripcion}=req.body


     const validarNombre = await Producto.findOne({nombre})
      
     if(validarNombre){
        return res.status(400).json({
            ok:false,
            message:"Ya existe un Producto con ese nombre"
        })
     }


    const datos ={
        nombre,
       precio,
       categoria,
       descripcion
    }

    const producto = await Producto.finByIdAnUpdate(id,datos,{new:true}) 

    res.status(200).json({
        message:"Producto actualizado",
        producto
    })


}


//borrar producto
const eliminarProducto = async (req,res) =>{

   const {id} = req.params
   const productoBorrado = await Producto.finByIdAnUpdate(id,{estado:false},{new:true})

   res.status(200).json({
    message:"Producto eliminado",
    productoBorrado,
   })
}


export { crearProducto, obtenerProductos,actualizarProducto,eliminarProducto };

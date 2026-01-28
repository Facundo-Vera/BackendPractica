import Categoria from "../models/Category.js"

const traerCategorias = async (req,res) =>{
      
     const categorias = await Categoria.find({estado:true})// Me trae solo las categorias con el valor true en el estado  
     .populate("usuario","username email role") // Me permite hacer coneccion con la colecion 1er dato el campo de la coleccion
    
     const total = await Categoria.countDocuments({estado:true}) // me trae el total de las categorias con el estado en true

     res.json({
        total,
        categorias,
     });
};


const crearCategoria = async (req,res) =>{
     
     const nombre = req.body.nombre.toUpperCase()

     const validarNombre = await Categoria.finOne({nombre})  

     if(validarNombre){
        return res.status(400).json({
            ok:false,
            message:`La categoria ${nombre} ya existe`
        })
     }


    const usuario = req.user._id

    const categoria = new Categoria({nombre,usuario})

    categoria.save()

    res.status(201).json({
        message:"Categoria guardada",
        categoria
    });

}

const actualizarCategoria = async (req,res) => {

    const {id} = req.params 

    // const {nombre} = req.body


    const nombre=req.body.nombre.toUpperCase()

    //*Validar nombre
     const validarNombre = await Categoria.findOne({nombre})
      
     if(validarNombre){
        return res.status(400).json({
            ok:false,
            message:"Ya existe una categoria con ese nombre"
        })
     }


    const datos ={
        nombre,
        usuario: req.user._id
    }

    const categoria = await Categoria.finByIdAnUpdate(id,datos,{new:true}) //se guarda la info de la categoria actualizada

    res.status(200).json({
        message:"Categoria actualizada",
        categoria
    })


}

const eliminarCategoria = async (req,res) =>{

   const {id} = req.params
   const categoriaBorrada = await Categoria.finByIdAnUpdate(id,{estado:false},{new:true})

   res.status(200).json({
    message:"Categoria eliminada",
    categoriaBorrada,
   })
}

export{traerCategorias,crearCategoria,actualizarCategoria,eliminarCategoria}
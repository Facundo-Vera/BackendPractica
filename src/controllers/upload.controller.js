import { v2 as cloudinary } from "cloudinary";
import Producto from "../models/Product.js";

cloudinary.config(process.env.CLOUDINARY_URL);

const actualizarImagenCloudinary = async (req, res) => {
  try {
    const { id } = req.params;

    let producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({
        ok: false,
        message: "No existe el producto",
      });
    }

    //^verificar que exista un  archivo

    // if (!req.files || req.files.archivo) {
    //   return res.status(400).json({
    //     ok: false,
    //     message: "No hay  archivo",
    //   });
    // }

    //guardo la request del archivo

    let file = req.files.archivo;

    //verificar que tenga eel buffer
    if (!file.data) {
      return res.status(400).json({
        ok: false,
        message: "Error en buffer",
      });
    }

    //Genero el archivo base 64

    const dataUri = `data:${file.mimetype};base64,${file.data.toSting("base64")}`;

    //Subir imagen y guardar la respuesta
    const result = await cloudinary.uploader.upload(dataUri);

    producto.img = result.secure_url
    producto.save()

    res.status(200).json({
      ok: true,
      message:"Imagen actualizada",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export { actualizarImagenCloudinary };

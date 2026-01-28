import { Schema,model } from "mongoose";

const ProductoSchema = Schema({
    
    nombre:{
        type:String,
        require:[true,"El nombre es obligatorio"],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:"Categoria",
        required:true
    },
    descripcion:{
        type:String,

    },
    disponible:{
        type:Boolean,
        default:true,
    },
    img:{
        type:String,
        default:"https://imgs.search.brave.com/c9LeOAIPbLmO8CJc96qKfjbDnf5w4wAg3K6fVVjnkiU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vMjIzNDQ4/NS8zMjA0NC9pLzQ1/MC9kZXBvc2l0cGhv/dG9zXzMyMDQ0MjI4/Ni1zdG9jay1pbGx1/c3RyYXRpb24tNDA0/LWVycm9yLXBhZ2Ut/bm90LWZvdW5kLmpw/Zw"
    }

})
export default model("Producto",ProductoSchema);
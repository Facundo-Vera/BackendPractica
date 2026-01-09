import express from "express";
import morgan from "morgan"
import { dbConnect } from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

const app= express();
const PORT = process.env.PORT;


//!Middlewares
app.use(express.json()); //&entiende el formato json 
app.use (express.urlencoded({extended:true})) //&puede recibir info en formato json de un formulario 
app.use(morgan(`dev`));

//!Rutas
app.use("/api/tasks", taskRoutes);


await dbConnect();

app.listen(PORT, () => console.log("Servidor en línea en puerto: " + PORT));
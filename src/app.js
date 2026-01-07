import express from "express";
import { dbConnect } from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

const app= express();
const PORT = process.env.PORT;

app.use(express.json());


app.use("/api/tasks", taskRoutes);


await dbConnect();

app.listen(PORT, () => console.log("Servidor en línea en puerto: " + PORT));
import express from "express";
import cors from "cors";
import taskRouter from "./routes/task.js";
import dotenv from "dotenv";
import { initialtDB } from "./bd.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ruta de prueba
app.get("/", (req, res) => {
  res.send("API corriendo");
});

const PORT = process.env.PORT || 4000;

// iniciando de la base de datos
initialtDB().then((database) => {
  const db = database;
  
  // usando las rutas de router
  app.use("/api/tasks", taskRouter(db));

  // escucha en 0.0.0.0 para render
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
  });
}).catch(err => {
  console.error("Error al conectar a la base de datos:", err);
  // si la base de datosfalla, igual arrancamos el servidor para ver el error en los logs
  app.listen(PORT, () => console.log(`Servidor con error de DB en puerto ${PORT}`));
});

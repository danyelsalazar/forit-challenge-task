import express from "express";
import cors from "cors";
import taskRouter from "./routes/task.js";
import dotenv from "dotenv";
import { initialtDB } from "./bd.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// dclaro mi base de daTos

let db;

const PORT = process.env.PORT || 4000;

// inicializo mi base de datos
initialtDB().then((database) => {
  db = database;

  // usando las rutas de router
  app.use("/api/tasks", taskRouter(db));

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
  });
});

// creo una primera ruta del servidor para probar
app.get("/", (req, res) => {
  res.send("API corriendo");
});

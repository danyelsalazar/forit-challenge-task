import express from "express"
import cors from "cors"
import taskRouter from "./routes/task.js"


const app = express()

app.use(cors())
app.use(express.json())

const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`,);
})

// creo una primera ruta del servidor para probar
app.get("/", (req, res)=>{
    res.send("API corriendo")
})

// usando las rutas de router
app.use("/api/tasks", taskRouter)
import express from "express"
import coors from "cors"

const app = express()

app.use(coors())
app.use(express.json())

const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`,);
})

// creo una primera ruta del servidor para probar
app.get("/", (req, res)=>{
    res.send("API corriendo")
})
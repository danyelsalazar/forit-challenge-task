import {Router} from "express"

// creo un router
const router = Router()


// creo un arreglo de tareas 
let tasks = [];

// creo la ruta GET
router.get("/", (req, res) => {
    // muestro las tareas
    res.json(tasks)
})

// creo una ruta para POST 
router.post("/", (req, res)=>{
    // creo una nueva tarea con la info recibida
    const newTask = {
        id: crypto.randomUUID(),
        title: req.body.title,
        complete: false
    };

    tasks.push(newTask)
    res.status(201).json({
        message: "Tarea cargada",
        task: newTask
    })
})

// creo la ruta para para PUT
router.put("/:id", (req,res)=>{
    const {id} = req.params;

    tasks = tasks.map(task => 
        task.id == id ? {...task, ...req.body} : task
    )

    res.json({
        message: "Task update",
        idTask: id
    })
})

// creo la ruta para el DELETE

router.delete("/:id", (req, res)=>{
    const {id}= req.params

    tasks = tasks.filter(task =>
        task.id != id
    )
    res.json({
        message: "Task deletee",
    })
})


export default router;
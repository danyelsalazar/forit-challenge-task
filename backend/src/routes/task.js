import { Router } from "express";

// creo un router
const router = Router();

// creo un arreglo mock de tareas
let tasks = [
  {
    id: crypto.randomUUID(),
    title: "Entrega Proyecto Final",
    description: "Subir el repositorio de React a la plataforma de la facultad.",
    complete: false,
    createAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    title: "Comprar víveres",
    description: "Leche, huevos, frutas y café para la semana.",
    complete: true,
    createAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    title: "Estudiar para Álgebra",
    description: "Repasar matrices y sistemas de ecuaciones lineales.",
    complete: false,
    createAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    title: "Gimnasio",
    description: "Entrenamiento de pierna y 20 min de cardio.",
    complete: false,
    createAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    title: "Resumen de Historia",
    description: "Leer los capítulos 3 y 4 del libro de texto.",
    complete: true,
    createAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    title: "Lavar la ropa",
    description: "Separar la ropa blanca y poner la lavadora.",
    complete: false,
    createAt: new Date()
  }
];


//=========== CREO RUTA GET =================
router.get("/", (req, res) => {
  // muestro las tareas
  res.json(tasks);
});

//========== CREO RUTA POST ====================
router.post("/", (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "title is required",
      });
    }
    // creo una nueva tarea con la info recibida
    const newTask = {
      id: crypto.randomUUID(),
      title: req.body.title,
      description: req.body.description,
      complete: false,
      createAt: new Date()
    };
    // agrego la tarea a mi arreglo de tareas
    tasks.push(newTask);

    res.status(201).json(newTask);
  } catch (error) {
    // en caso de rrors de servidor lo atrapo con el catch
    res.status(500).json({
      error: "internal error server",
    });
  }
});

// ============ CREO RUTA PUT ================
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;

    // verifico si existe la tarea
    const existTask = taskExist(id)

    // si no existe informo
    if (!existTask) {
      return res.status(404).json({
        error: "Task not exist",
      });
    }

    // si existe continuo y la modifico
    tasks = tasks.map((task) =>
      task.id == id ? { ...task, ...req.body } : task,
    );

    res.json({
      message: "Task update",
      idTask: id,
    });

  } catch (error) {
    res.status(500).json({
      error: "Internal error server",
    });
  }
});

//============= CREO RUTA DELETE ====================

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const existTask = taskExist(id)

    if(!existTask){
        return res.status(404).json({
            error: "Task not exist"
        })
    }
    // filtro y modifico el array original sin el que elimine
    tasks = tasks.filter((task) => task.id != id);

    res.json({
      message: "Task deletee",
    });
  } catch (error) {}
});


// ====== funcion para verificar si existe tarea =========
const taskExist = (id)=>{
    return tasks.some( task => task.id == id)
}


export default router;

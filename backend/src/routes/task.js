import { Router } from "express";

// creo un router
const router = Router();

// creo un arreglo de tareas
let tasks = [
  {
    id: 1,
    title: "Challenge ForIt",
    completed: true,
  },
  {
    id: 2,
    title: "Debo crear tareas",
    completed: true,
  },
  {
    id: 3,
    title: "LLevar al dentista a mi herman",
    completed: false,
  },
  {
    id: 4,
    title: "Estudiar para bases de datos",
    completed: false,
  },
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
      complete: false,
    };
    // agrego la tarea a mi arreglo de tareas
    tasks.push(newTask);

    res.status(201).json({
      message: "Tarea cargada",
      task: newTask,
    });
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

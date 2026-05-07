import { Router } from "express";

const taskRouter = (db) => {
  // creo un router
  const router = Router();

  //=========== CREO RUTA GET =================
  router.get("/", async (req, res) => {
    try {
      // traigo la data
      const tasks = await db.all("SELECT * FROM tasks");
      // la doy al usuario
      res.json(tasks);
    } catch (error) {
      res.status(500).json({
        error: "Error al traer los datos",
      });
    }
  });

  //========== creo ruta POST ====================
  router.post("/", async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!title || title.trim() === "") {
        return res.status(400).json({
          error: "title is required",
        });
      }

      // hago la consulta de sql a la base de datos creando la tarea
      const result = await db.run(
        `
      INSERT INTO tasks (title, description, completed, createdAt)
      VALUES (?,?,?, ?)`,
        [title, description, false, new Date().toDateString()],
      );

      // creo una nueva tarea con la info recibida
      const newTask = await db.get(
        `
      SELECT * FROM tasks WHERE id = ?`,
        result.lastID,
      );

      res.status(201).json(newTask);
    } catch (error) {
      // en caso de rrors de servidor lo atrapo con el catch
      res.status(500).json({
        error: "internal error server",
      });
    }
  });

  // ============ creo la ruta PUT ================
  router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // 1. Verificar si la tarea existe
    const existTask = await db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    if (!existTask) {
      return res.status(404).json({ error: "Task does not exist" });
    }

    // 2. Valido de titulo vacio (solo si se envio uno)
    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }

    // 3. Mantener valores actuales si no se envian nuevos
    const finalTitle = title !== undefined ? title : existTask.title;
    const finalDescription = description !== undefined ? description : existTask.description;
    const finalCompleted = completed !== undefined ? completed : existTask.completed;

    await db.run(
      `UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?`,
      [finalTitle, finalDescription, finalCompleted, id]
    );

    // 4. Obtener la tarea actualizada (usando array para el parámetro)
    const updatedTask = await db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    
    res.json(updatedTask);
  } catch (error) {
    console.error(error); // lo uso para debuguear
    res.status(500).json({ error: "Internal server error" });
  }
});


  //============= creo ruta  DELETE ====================
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const existTask = await db.get("SELECT * FROM tasks WHERE id = ?", id);

      if (!existTask) {
        return res.status(404).json({
          error: "Task not exist",
        });
      }

      await db.run("DELETE FROM tasks WHERE id = ?", id);

      res.json({
        message: "Task deleted",
      });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  });

  return router;
};

export default taskRouter;

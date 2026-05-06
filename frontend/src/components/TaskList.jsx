import { deleteTask, updateTask } from "../services/api";
import TaskForm from "./TaskForm";
import {postTask} from "../services/api.js"
import { useState } from "react";

const TaskList = ({ tasks = [], setTasks }) => {

const [editingTask, setEditingTask] = useState(null);

// ====== editar tarea completada o no
  const handleUpdateTask = async (id, taskUpdate) => {
    try {
      await updateTask(id, taskUpdate);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, ...taskUpdate } : task,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

// === eliminar tarea=======
  const handleDeleteTask = async (id) => {
    try {
      if (!id) return new Error("No se envio el id");
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //====== funcion para agregar una nueva tarea ======
const handleAddTask = async (task)=>{
  // creo la nueva tarea y se la envio a la api
  const newTask = await postTask(task)
  // actualizo el arrefglo de tareas
  setTasks((prev)=> [...prev, newTask])
}


  return (
    <div>
      <TaskForm onAddTask={handleAddTask} editingTask={editingTask} setEditingTask={setEditingTask} handleUpdateTask={handleUpdateTask} setEditingTask={setEditingTask} key={editingTask?.id || "new"} />
      {tasks.length > 0 ? (
        tasks.map((task) => {
          const date = new Date(task.createAt);

          const { day, month, year } = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          };
          return (
            <div key={task.id}>
              <h3>{task.title}</h3>
              <p>{`${day}-${month}-${year}`}</p>
              <span>{task.complete ? "✅" : "❌"}</span>
              <p>{task.description}</p>
              <button
                className="btn-delete"
                onClick={() => handleDeleteTask(task.id)}
              >
                Eliminar
              </button>
              {/* boton para editar estado de la tarea */}
              <button
                className="btn-update"
                onClick={() =>
                  handleUpdateTask(task.id, { complete: !task.complete })
                }
              >
                Estado
              </button>
              {/* boton para editar la tarea */}
              <button onClick={()=> setEditingTask(task)}>Editar tarea</button>

            </div>
          );
        })
      ) : (
        <p>No hay tareas para mostrar.</p>
      )}
    </div>
  );
};

export default TaskList;

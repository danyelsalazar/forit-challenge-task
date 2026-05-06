import { deleteTask, updateTask } from "../services/api";
import TaskForm from "./TaskForm";
import { postTask } from "../services/api.js";
import { useState } from "react";
import TaskItem from "./TaskItem.jsx";

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
  const handleAddTask = async (task) => {
    // creo la nueva tarea y se la envio a la api
    const newTask = await postTask(task);
    // actualizo el arrefglo de tareas
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="container-task-form">
      <TaskForm
        onAddTask={handleAddTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        handleUpdateTask={handleUpdateTask}
        setEditingTask={setEditingTask}
        key={editingTask?.id || "new"}
      />

      <div className="container-tasks">
        {tasks.length > 0 ? (
          <TaskItem
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleUpdateTask={handleUpdateTask}
            setEditingTask={setEditingTask}
          />
        ) : (
          <p>No hay tareas para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;

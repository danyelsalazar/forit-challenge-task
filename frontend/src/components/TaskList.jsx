import { deleteTask, updateTask } from "../services/api";
import TaskForm from "./TaskForm";
import { postTask } from "../services/api.js";
import { useState } from "react";
import TaskItem from "./TaskItem.jsx";

const TaskList = ({ tasks = [], setTasks }) => {
  const [editingTask, setEditingTask] = useState(null);
  // creoo un estado para saber si el form esta abierto o no
  const [formActive, setFormActive] = useState(false);

  // hook para el filtrado
  const [taskFilter, setTaskFilter] = useState("all");

  // un estado para la busqueda de tarea
  const [searchTask, setSearchTask] = useState("")

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
      if (!id) throw new Error("No se envio el id");
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

  // ========== Abrir formulario ============
  const handleOpenFormTask = () => {
    setFormActive(!formActive);
  };

  // ==== junto la preparacion de la edicion de una tarea =====
  const preparingEdition = (task) => {
    setEditingTask(task);
    handleOpenFormTask();
  };

  // filtrar las tareas
  const filterTask = tasks.filter((task) => {
    // aqui las filtro por estado de la tarea
    let matchesStatus = true
    if (taskFilter === "complete") matchesStatus = task.complete === true;
    if (taskFilter === "pending") matchesStatus = task.complete === false;
    // muestro todas las tareas:
    
    // ahora filtro por texto por titulo
    const searchMatch = task.title.toLowerCase().includes(searchTask.toLocaleLowerCase())
    // mostramos la tarea cuando se cumplen las dos condiciones
    return searchMatch && matchesStatus
  });

  return (
    <>
      <div className="container-title-app">
        <h2>Tasks List</h2>
        <input
          className="input-search-task"
          type="search"
          placeholder="Buscar tarea"
          onChange={(e)=> setSearchTask(e.target.value)}
        />
        <div className="container-btn-filter">
          <button
            className="btn-filter btn-all-tasks"
            onClick={() => {
              setTaskFilter("all");
            }}
          >
            Todo
          </button>
          <button
            className="btn-filter btn-copleted-tasks"
            onClick={() => {
              setTaskFilter("complete");
            }}
          >
            Completada
          </button>
          <button
            className="btn-filter btn-pending-tasks"
            onClick={() => {
              setTaskFilter("pending");
            }}
          >
            Pendiente
          </button>
        </div>
      </div>
      <div className="container-tasks-from-and-tasks">
        <TaskForm
          onAddTask={handleAddTask}
          editingTask={editingTask}
          handleUpdateTask={handleUpdateTask}
          setEditingTask={setEditingTask}
          formActive={formActive}
          handleOpenFormTask={handleOpenFormTask}
          key={editingTask?.id || "new"}
        />

        <div className="container-tasks">
          {tasks.length > 0 ? (
            filterTask.map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  handleDeleteTask={handleDeleteTask}
                  handleUpdateTask={handleUpdateTask}
                  preparingEdition={preparingEdition}
                />
              );
            })
          ) : (
            <p className="not-found-task">No hay tareas para mostrar.</p>
          )}
        </div>
        {/* boton flotante para crear una nueva tarea */}
        <button
          className="add-task-btn-float"
          onClick={() => handleOpenFormTask()}
          title="Nueva tarea"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#e3e3e3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
            </g>
          </svg>
        </button>
      </div>
    </>
  );
};

export default TaskList;

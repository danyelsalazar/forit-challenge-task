import { useState } from "react";

const TaskForm = ({
  onAddTask,
  editingTask,
  handleUpdateTask,
  setEditingTask,
}) => {
  // creo un estado para la data de la tarea puede estar vacio o con la data de una tarea si es que se clikeo editar
  const [dataTask, setDataTask] = useState({
    title: editingTask?.title || "",
    description: editingTask?.description || "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); //evito que se recargue la pagina

      // verifico que el titulo no este vacio, si es asi salgo
      if (!dataTask.title.trim() && !dataTask.description.trim()) return;

      //decido a quien llamar si a editar tarea o a agregar tarea
      if (editingTask) {
        // editom la tarea
        await handleUpdateTask(editingTask.id, dataTask);
        setEditingTask(null); // limpio la key
      } else {
        // creo tarea
        // le mandamos la data de la tarea al padre
        await onAddTask(dataTask);
      }

      // limpio la data del estado asiu se limpian los imputs
      setDataTask({ title: "", description: "" });
    } catch (error) {
      console.log(error);
    }
  };

  //   ====reseteo el formulario=====
  const handleReset = () => {
    setEditingTask(null);
    setDataTask({ title: "", description: "" });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="container-inputs-form">
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={dataTask.title}
          onChange={(e) =>
            setDataTask((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          required
          maxLength={30}
        />
        <textarea className="textarea"
          type="text"
          placeholder="Descripcion..."
          value={dataTask.description}
          required
          onChange={(e) =>
            setDataTask((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          maxLength={500}
        />
      </div>
      <div className="container-btn-form">
        <button className="btn-form btn-form-add" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 24 24"
          >
            <path
              fill="#00b5f7"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"
            />
          </svg>
        </button>
        <button className="btn-form" type="reset" onClick={() => handleReset()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 24 24"
          >
            <path
              fill="#cccccc"
              d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
export default TaskForm;

import { useState } from "react";

const TaskForm = ({
  onAddTask,
  editingTask,
  handleUpdateTask,
  setEditingTask,
  formActive,
  handleOpenFormTask,
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

  // envuelvo la limpieza del formulario con una funcion
  const cerrarYLimpiar = () => {
    handleReset(); 
    handleOpenFormTask();
  };

  //   ====reseteo el formulario=====
  const handleReset = () => {
    setEditingTask(null);
    setDataTask({ title: "", description: "" });
  };


  return (
    <>
      {/* creo el formulario para hacer la tarea */}
      {formActive && (
        // ==le agrego la limpieza y ceerar el form cuandpo el usuario toque el fondo
        <div className="container-form-fondo" onClick={()=> cerrarYLimpiar()}>
          {/* ==aqui uso el stopPropagation para que no se me cierre el formulario al hacer click sobre el */}
          <form className="form-container" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <div className="container-title-task-btn-close-form">
              <button
                className="close-form"
                title="Cerrar formulario"
                onClick={() => {
                  cerrarYLimpiar()
                }}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="128"
                  height="128"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#cccccc"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"
                  />
                </svg>
              </button>
              <h4 className="title-task-form">Task</h4>
            </div>
            <div className="container-inputs-form">
              <input
                type="text"
                placeholder="Titulo"
                value={dataTask.title}
                onChange={(e) =>
                  setDataTask((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                required
                maxLength={50}
              />
              <textarea
                className="textarea"
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
            {/* estos son los botones para enviar o resetear el formulario de tarea */}
            <div className="container-btn-form">
              <button
                className="btn-form btn-form-add"
                type="submit"
                title="Enviar tarea"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="128"
                  height="128"
                  viewBox="0 0 24 24"
                >
                  <path fill="#cccccc" d="M3 20v-6l8-2l-8-2V4l19 8z" />
                </svg>
              </button>
              <button
                className="btn-form btn-rest-form"
                type="button"
                onClick={handleReset}
                title="Borrar formulario"
              >
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
        </div>
      )}
    </>
  ); // Cerramos el return correctamente
}; // Cerramos el componente
export default TaskForm;

import { useState} from "react";

const TaskForm = ({
  onAddTask,
  editingTask,
  handleUpdateTask,
  setEditingTask
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
const handleReset = ()=>{
    setEditingTask(null)
    setDataTask({title:"", description:""})

}

  return (
    <form onSubmit={handleSubmit}>
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
      />
      <input
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
      />

      <button type="submit" >Agregar</button>
      <button type="reset" onClick={()=> handleReset()}>Cancelar</button>
    </form>
  );
};
export default TaskForm;

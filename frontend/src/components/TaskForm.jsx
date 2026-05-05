import { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); //evito que se recargue la pagina

      // verifico que el titulo no este vacio, si es asi salgo
      if (!title.trim()) return;

      // le mandamos el title al padre
      await onAddTask({ title });

      // limpio el title
      setTitle("");
    } catch (error) {
        console.log(error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">Agregar</button>
    </form>
  );
};
export default TaskForm;

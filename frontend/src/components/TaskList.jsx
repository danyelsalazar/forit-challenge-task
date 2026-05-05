import { deleteTask } from "../services/api";

const TaskList = ({ tasks = [], setTasks}) => {

    const handleDeleteTask = async (id)=>{
        try {
            if(!id) return new Error("No se envio el id");
            await deleteTask(id)
            setTasks((prev)=> prev.filter((task)=> task.id !== id))
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id}>
            <p>{task.title}</p>
            <button className="btn-delete" onClick={()=> handleDeleteTask(task.id)}>Eliminar</button>
            <button className="btn-update">Editar</button>
          </div>
        ))
      ) : (
        <p>No hay tareas para mostrar.</p>
      )}
    </div>
  );
};

export default TaskList;

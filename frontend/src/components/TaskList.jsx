import { deleteTask , updateTask} from "../services/api";

const TaskList = ({ tasks = [], setTasks}) => {

    const handleUpdateTask = async (id, taskUpdate)=>{
        try {
            await updateTask(id, taskUpdate)

            setTasks((prev)=> 
                prev.map((task)=>
                    task.id === id ? {...task, ...taskUpdate} : task))
        } catch (error) {
            console.log(error);
            
        }
    }

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
            <span>{task.completed ? "✅" : "❌"}</span>
            <button className="btn-delete" onClick={()=> handleDeleteTask(task.id)}>Eliminar</button>
            <button className="btn-update" onClick={()=> handleUpdateTask( task.id, {completed: !task.completed})}>Editar</button>
          </div>
        ))
      ) : (
        <p>No hay tareas para mostrar.</p>
      )}
    </div>
  );
};

export default TaskList;

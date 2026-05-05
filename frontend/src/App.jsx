import { useEffect, useState } from "react"
import { getTask , postTask} from "./services/api"
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {

  // creo un estado para guardas las tareas
  const [tasks, setTasks] = useState([]);

// uso efect para mostrar las tareas luego que el componente se renderice
useEffect(()=>{
  
  const fetchTask = async ()=>{
    try{
      const data = await  getTask()
      setTasks(data)
    }catch(error){
      console.log("Error al cargar las tareas: " , error);
    }
  }
  fetchTask();
}, [])

// funsion para agregar una nueva tarea 
const handleAddTask = async (task)=>{
  // creo la nueva tarea y se la envio a la api
  const newTask = await postTask(task)
  // actualizo el arrefglo de tareas
  setTasks([...tasks, newTask])
}

  return (
    <div>
      <h2>Task List</h2>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks}/>
    </div>
  )
}

export default App

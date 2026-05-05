import { useState } from "react"
import { getTask } from "./services/api"

const App = () => {

  // creo un estado para guardas las tareas
  const [tasks, setTasks] = useState([]);

// creo un estado para escuchar la api
useState(()=>{
  const fechTask = async ()=>{
    try{
      const data = await  getTask()
      setTasks(data)
    }catch(error){
      console.log("Error al cargar las tareas: " , error);
    }
  }

  fechTask()
}, [])

  return (
    <>
    <h1>Tasks list</h1>
      <ul>
        {
          tasks.map(task =>(
            <li key={task.id}>{task.title}</li>
          ))
        }
      </ul>
    </>
  )
}

export default App

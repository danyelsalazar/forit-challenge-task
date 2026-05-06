import { useEffect, useState } from "react";
import { getTask } from "./services/api";
import TaskList from "./components/TaskList";

const App = () => {
  // creo un estado para guardas las tareas
  const [tasks, setTasks] = useState([]);
  // uso efect para mostrar las tareas luego que el componente se renderice
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTask();
        setTasks(data);
      } catch (error) {
        console.log("Error al cargar las tareas: ", error);
      }
    };
    fetchTask();
  }, []);

  return (
    <div className="container-app-list">
      <div className="container-title-app">
        <h2>Task List</h2>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;

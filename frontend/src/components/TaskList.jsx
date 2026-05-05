const TaskList = ({ tasks = [] }) => {
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id}>
            <p>{task.title}</p>
          </div>
        ))
      ) : (
        <p>No hay tareas para mostrar.</p>
      )}
    </div>
  );
};

export default TaskList;

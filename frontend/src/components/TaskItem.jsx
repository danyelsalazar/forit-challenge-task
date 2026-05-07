const TaskItem = ({
  task,
  handleDeleteTask,
  handleUpdateTask,
  preparingEdition,
}) => {
  const date = new Date(task.createAt);
  // descompongo la fecha asi la pudo usar por partes
  const { day, month, year } = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
  // renderizo la tarea
  return (
    <div className="container-item-task">
      <div className="container-item-task-info">
        <h3
          className={`title-task ${task.complete ? "title-task-complete" : ""}`}
        >
          {task.complete ? (
            <svg
              className="state-task"
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 24 24"
            >
              <path fill="#86d813" d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Z" />
            </svg>
          ) : (
            <svg
              className="state-task"
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 24 24"
            >
              <path fill="#dc2626" d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Z" />
            </svg>
          )}
          {task.title}
        </h3>
        <p className="description-task">{task.description}</p>
        <p className="date-task">{`${day}-${month}-${year}`}</p>
      </div>

      <div className="container-btns-task">
        {/* btn para eliminar tarea */}
        <button
          className="btn-delete btn-task"
          onClick={() => handleDeleteTask(task.id)}
          title="Eliminar tarea"
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
              strokeWidth="1.5"
              d="M1 5h22m-8.75-4h-4.5a1.5 1.5 0 0 0-1.5 1.5V5h7.5V2.5a1.5 1.5 0 0 0-1.5-1.5m-4.5 16.75v-7.5m4.5 7.5v-7.5m4.61 11.37A1.49 1.49 0 0 1 17.37 23H6.63a1.49 1.49 0 0 1-1.49-1.38L3.75 5h16.5z"
            />
          </svg>
        </button>
        {/* btn para asignar tarea como completada o pendiente*/}
        <button
          className={`btn-estatus-task ${
            task.complete
              ? "btn-estatus-task-complete"
              : "btn-estatus-task-incomplete"
          }`}
          onClick={() => {
            handleUpdateTask(task.id, { complete: !task.complete });
          }}
          title={
            task.complete ? "Marcar como pendiente" : "Marcar como completado"
          }
        ></button>
        {/* boton para editar la tarea */}
        <button
          className="btn-task"
          onClick={() => {
            preparingEdition(task);
          }}
          title="Editar tarea"
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
              d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

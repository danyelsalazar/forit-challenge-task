const TaskItem = ({
  tasks,
  handleDeleteTask,
  handleUpdateTask,
  setEditingTask,
}) => {
  return tasks.map((task) => {
    const date = new Date(task.createAt);

    const { day, month, year } = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    return (
      <div className="container-item-task" key={task.id}>
        <div className="container-item-task-info">
          <h3>{task.title}</h3>
          <p className="description-task">{task.description}</p>
          <p>{`${day}-${month}-${year}`}</p>
          {task.complete ? (
            <svg
              className="state-task"
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 24 24"
            >
              <path fill="#dc2626" d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Z" />
            </svg>
          ) : (
            <svg
              className="state-task"
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 24 24"
            >
              <path fill="#86d813" d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Z" />
            </svg>
          )}
        </div>

        <div className="container-btns-task">
          <button
            className="btn-delete btn-task"
            onClick={() => handleDeleteTask(task.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 12 12"
            >
              <path
                fill="#dc2626"
                d="M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0m3 5H3v2h6Z"
              />
            </svg>
          </button>
          {/* boton tarea no completada */}
          <button
            className="btn-update btn-task"
            onClick={() => handleUpdateTask(task.id, { complete: !task.complete })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 12 12"
            >
              <path
                fill="#cccccc"
                fill-rule="evenodd"
                d="M12 6A6 6 0 1 1 0 6a6 6 0 0 1 12 0M5 3a1 1 0 0 1 2 0v3a1 1 0 0 1-2 0zm1 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
                clip-rule="evenodd"
              />
            </svg>{" "}
          </button>
          {/* boton para editar la tarea */}
          <button className="btn-task" onClick={() => setEditingTask(task)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="#cccccc"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    );
  });
};

export default TaskItem;

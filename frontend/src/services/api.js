const API_URL = import.meta.env.VITE_API_URL;

// ======= TRAIGO LAS TAREAS CON GET =====
export const getTask = async () => {
  try {
    const res = await fetch(`${API_URL}/tasks`);
    // verificamos si las respuesta es positiva o no
    if(!res.ok) throw new Error("Error al obtener las tareas");

    return await res.json();
  } catch (error) {
    console.log("Error en el getTast:", error);
    // retorno un arreglo vacio asi no me rompe el renderizado luego 
    return [];
  }
};

// ====== AGREGO UNA TAREA CON EL POST =========
export const postTask = async (task) => {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

// ======== ELIMINAR TAREA CON DELETE =========

export const deleteTask = async (id) => {
    try {
        await fetch(`${API_URL}/tasks/${id}`, {
            method: "DELETE",
        });

    } catch (error) {
        console.log(error);
        
    }
};

// ========== EDITAR TAREA UPDATE ==============
export const  updateTask = async (id, taskUpdate) =>{
    try {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(taskUpdate)
        })

        if(!res.ok) throw new Error("No se logro encontrar la tarea")
    } catch (error) {
        console.log("Error en el updateTasks:", error);
        
    }
}

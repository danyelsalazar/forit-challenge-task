const API_URL = "http://localhost:4000/api/tasks";

// ======= TRAIGO LAS TAREAS CON GET =====
export const getTask = async () => {
  try {
    const res = await fetch(API_URL);
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
    const res = await fetch(API_URL, {
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
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

    } catch (error) {
        console.log(error);
        
    }
};

const API_URL =  "http://localhost:4000/api/tasks"

// ======= TRAIGO LAS TAREAS CON GET =====
export const getTask = async () =>{
    const res = await  fetch(API_URL)
    return await res.json()
}

// ====== AGREGO UNA TAREA CON EL POST =========
export const postTask = async (task)=>{
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
    
    return await res.json()
}
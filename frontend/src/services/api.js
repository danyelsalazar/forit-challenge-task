const API_URL =  "http://localhost:4000/api/tasks"

export const getTask = async () =>{
    const res = await  fetch(API_URL)
    return await res.json()
}
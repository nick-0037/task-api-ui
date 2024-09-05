const BASE_URL = 'https://task-api-fawn.vercel.app/api/tasks'

let token = null

export const setToken = (newToken) => {
  token =  `Bearer ${newToken}`
  console.log(token)
} 

export const getAllTasks = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })

    const data = await response.json()
    return data
  } catch(err) {
    console.error('Error fetching tasks', err)
  }
}

export const createTask = async (newObject) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(newObject)
    })

    const data = await response.json()
    return data
  } catch(err) {
    console.error('Error creating task', err)
  }
}

export const updateTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`,{
      method: 'PUT',
      headers: {
        'Authorization': token
      }
    })

    const data = await response.json()
    return data
  } catch(err) {
    console.error('Error updating task', err)
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`,{
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    })

    if(!response.ok) {
      throw new Error('Error deleting task')
    }

    return 'Task deleted successfully'
  } catch(err) {
    console.error('Error deleting tasks', err)
  }
}
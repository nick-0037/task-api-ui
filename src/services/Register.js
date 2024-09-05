const BASE_URL = 'https://task-api-fawn.vercel.app/api/users'

const createUser = async (credentials) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    
    const data = await response.json()
    return data
  } catch(err) {
    console.error('Error during login', err)
  }
}

export default { createUser }
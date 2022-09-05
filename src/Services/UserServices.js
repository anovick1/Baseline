import Client from './api'

export const GetUsers = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await Client.get('/users/')
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateUser = async (id, body) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const user = await Client.put('/users/' + id, {
      name: body.name,
      email: body.email,
      pfp_url: body.pfp_url
    })
    return user.data
  } catch (error) {
    throw error
  }
}
export const createUser = async (body) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const user = await Client.post('/users/', {
      name: body.name,
      email: body.email,
      pfp_url: body.pfp_url
    })
    return user.data
  } catch (error) {
    throw error
  }
}

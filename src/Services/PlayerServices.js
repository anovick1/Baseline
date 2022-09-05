import Client from './api'

export const getPlayersById = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await Client.get('/players/' + id)
    return res.data
  } catch (error) {
    throw error
  }
}

import Client from './api'

export const GetCharts = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await Client.get('/users/')
    return res.data
  } catch (error) {
    throw error
  }
}

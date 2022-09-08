import Client from './api'

export const GetCharts = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await Client.get('/charts/')
    return res.data
  } catch (error) {
    throw error
  }
}
export const GetChartsById = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await Client.get('/charts/' + id)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteChart = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await Client.delete('/charts/' + id)
    return res.data
  } catch (error) {
    throw error
  }
}

export const createChart = async (body) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const chart = await Client.post('/charts/', {
      title: body.title,
      author: body.author,
      player: body.player,
      y_year: body.y_year,
      x: body.x,
      description: body.description
    })
    return chart.data
  } catch (error) {
    throw error
  }
}
export const updateChart = async (body, id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const chart = await Client.put('/charts/' + id, {
      title: body.title,
      author: body.author,
      player: body.player,
      y_year: body.y_year,
      x: body.x,
      description: body.description
    })
    console.log(chart.data)
    return chart.data
  } catch (error) {
    throw error
  }
}

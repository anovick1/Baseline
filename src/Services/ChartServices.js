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

// export const updateUser = async (user_id, body) => {
//   try {
//     const user = await Client.put('/users/' + user_id, {
//       firstName: body.firstName,
//       lastName: body.lastName,
//       city: body.city,
//       state: body.state,
//       age: body.age,
//       gender: body.gender,
//       orientation: body.orientation,
//       ig_link: body.ig_link,
//       fb_link: body.fb_link,
//       li_link: body.li_link,
//       pfp_link: body.pfp_link,
//       bio: body.bio
//     })
//     return user.data
//   } catch (error) {
//     throw error
//   }
// }

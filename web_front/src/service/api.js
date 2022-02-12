import axios from 'axios'
import router from '../router/index'
import store from '../store'


export default async (method, path, data) => {

  let config = {
    url: `${store.state.urls.baseURL + path}`,
    method: method,
    data: data,
  }

  if (localStorage.getItem('token')) {
    config.headers = {}
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }

  return axios.request(config).then(response => {

    return response.data

  }).catch(err => {

    if (err.response.status === 401) {
      localStorage.removeItem('token')
      router.push("/login").catch(() => false)
      return
    }
    throw new Error()

  })

}
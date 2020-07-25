import axios from 'axios'
import auth from './../services/auth.service.js'

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL + '/api',
  baseURL: "http://localhost:3600" + '/api',
})

api.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer ${
      auth && auth.isLoggedIn() ? auth.getToken() : ''
    }`
       config.headers['Accept'] = 'application/json'
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export { api }

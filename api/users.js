import axios from 'axios'

const API_ENDPOINT = process.env.BASE_URL

export default {
  createUser (data) {
    return axios.post(API_ENDPOINT + '/users.json', data)
  },
  getUser (paramsUrl) {
    return axios.get(API_ENDPOINT + '/users/' + paramsUrl + '.json')
  },
  getAllUsers () {
    return axios.get(API_ENDPOINT + '/users.json')
  },
  updateUser (paramsUrl, data) {
    return axios.put(API_ENDPOINT + '/users/' + paramsUrl + '.json', data)
  },
  deleteUser (paramsUrl) {
    return axios.delete(API_ENDPOINT + '/users/' + paramsUrl + '.json')
  }
}

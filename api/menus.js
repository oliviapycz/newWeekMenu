import axios from 'axios'

const API_ENDPOINT = process.env.BASE_URL

export default {
  createMenu (data) {
    return axios.post(API_ENDPOINT + '/menus.json', data)
  },
  getMenu (paramsUrl) {
    console.log('in api menu', paramsUrl)
    return axios.get(API_ENDPOINT + '/menus/' + paramsUrl + '.json')
  },
  updateMenu (paramsUrl, data) {
    return axios.put(API_ENDPOINT + '/menus/' + paramsUrl + '.json', data)
  },
  deleteMenu (paramsUrl) {
    return axios.delete(API_ENDPOINT + '/menus/' + paramsUrl + '.json')
  }
}

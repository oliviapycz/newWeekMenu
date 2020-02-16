import axios from 'axios'

const API_ENDPOINT = process.env.BASE_URL

export default {
  createChannel (data) {
    return axios.post(API_ENDPOINT + '/channels.json', data)
  },
  getChannel (paramsUrl) {
    return axios.get(API_ENDPOINT + '/channels/' + paramsUrl + '.json')
  },
  getAllChannels () {
    return axios.get(API_ENDPOINT + '/channels.json')
  },
  updateChannel (paramsUrl, data) {
    return axios.put(API_ENDPOINT + '/channels/' + paramsUrl + '.json', data)
  },
  deleteChannel (paramsUrl) {
    return axios.delete(API_ENDPOINT + '/channels/' + paramsUrl + '.json')
  }
}

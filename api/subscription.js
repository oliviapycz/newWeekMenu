import axios from 'axios'

const API_ENDPOINT = process.env.BASE_URL

// const headers = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json'
// }
export default {
  createSubscription (newSubscription) {
    return axios.post(API_ENDPOINT + '/subscriptions.json', newSubscription)
  }
}

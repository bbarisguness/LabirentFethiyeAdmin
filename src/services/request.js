import axios from "axios"
const serviceToken = localStorage.getItem('serviceToken');
const client = axios.create({ 
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: `Bearer ${serviceToken}` }
})

export default function apiRequest(method, path = "", payload = {}) {
  const options = {
    method,
    withCredentials: true,
    url: path,
    data: payload,
    json: true,
  }
  return client(options)
}

import axios from 'axios'


const BASE_URL = 'http://10.0.1.159:8000/api/v1'

const http = axios.create({
  baseURL: BASE_URL
})

export default http

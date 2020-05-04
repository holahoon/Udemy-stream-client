import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3001' // This is hooked up with db.json in api folder(outside)
})
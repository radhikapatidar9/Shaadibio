import axios from "axios"

const API = axios.create({

baseURL: "https://shaadibio-backend-m2mt.onrender.com/api/v1"

})

export default API;
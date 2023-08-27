import axios, { AxiosInstance } from "axios"

// Importing base url from the env file
const BASE_URL:string = import.meta.env.VITE_BASE_URL; 

const axiosInstance:AxiosInstance = axios.create({
    baseURL: BASE_URL,
})

export default axiosInstance;
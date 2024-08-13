import axios from "axios";

const URL = 'https://66bbadf96a4ab5edd6391d5d.mockapi.io/productos'

export const axiosInstance = axios.create({
    baseURL: URL
})
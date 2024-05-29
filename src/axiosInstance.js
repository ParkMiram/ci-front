import axios from "axios";
const axiosInstance = axios.create({
    baseURL: `http://${location.host}:8080/api`
});

export default axiosInstance;
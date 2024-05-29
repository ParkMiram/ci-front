import axios from "axios";
const axiosInstance = axios.create({
    baseURL: `http://${window.location.host}:8080/api`
});

export default axiosInstance;
import axios from "axios";
const axiosInstance = axios.create({
    // baseURL: `http://${window.location.host}:8080/api`
    // baseURL: `http://104.154.175.41:8080/api`
    baseURL: `/api`
});

export default axiosInstance;
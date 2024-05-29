import axios from "axios";
const axiosInstance = axios.create({
    baseURL: `http://104.154.175.41:8080/api`
});

export default axiosInstance;
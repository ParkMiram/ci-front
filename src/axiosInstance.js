import axios from "axios";
const axiosInstance = axios.create({
    // baseURL: `http://${window.location.host}:8080/api`
    // baseURL: `http://104.154.175.41:8080/api`
    // baseURL: `http://localhost:8080/api`
    baseURL: `/api`
});
// export const cmmtAxiosInstance = axios.create({
//     // baseURL: `http://${window.location.host}:8080/api`
//     // baseURL: `http://104.154.175.41:8080/api`
//     // baseURL: `/api`
//     baseURL: `http://localhost:3001/api/boards`
// });

export default axiosInstance;
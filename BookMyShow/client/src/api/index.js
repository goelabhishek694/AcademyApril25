//communication pipe
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 5000,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
});

console.log("axiosInstance", axiosInstance);

export default axiosInstance;
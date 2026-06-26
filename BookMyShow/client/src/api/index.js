//communication pipe
import axios from "axios";

const axiosInstance = axios.create({
    baseUrl: "http://localhost:3000/api",
    timeout: 5000,
});

export default axiosInstance;
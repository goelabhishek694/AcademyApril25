// user.js -> domain specific api calls 
import axiosInstance from "./index";

export const registerUser = async (payload) => {
    const response = await axiosInstance.post("/users/register", payload);
    return response.data;
};

export const loginUser = async(payload) => {
    const response = await axiosInstance.post("/users/login", payload);
    return response.data;
}
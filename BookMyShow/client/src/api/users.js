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

export const getCurrentUser = async() => {
    const response = await axiosInstance.get("/users/current");
    return response.data;
}

export const forgetPassword = async(payload) => {
    const response = await axiosInstance.patch("/users/forget-password", payload);
    return response.data;
}

export const resetPassword = async(payload, email) => {
    const response = await axiosInstance.patch(`/users/reset-password/${email}`, payload);
    return response.data;
}
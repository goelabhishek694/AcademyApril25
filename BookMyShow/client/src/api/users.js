// user.js -> domain specific api calls 

import axiosInstance from "./index";

export const registerUser = async (payload) => {
    const response = await axiosInstance.post("/users/register", payload);
    return response.data;
};
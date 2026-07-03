// user.js -> domain specific api calls
import axiosInstance from "./index";

export const addTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post("/theatres", payload);
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

export const getMyTheatres = async () => {
  try {
    const response = await axiosInstance.get("/theatres");
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

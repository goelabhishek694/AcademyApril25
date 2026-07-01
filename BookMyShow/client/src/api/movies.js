// user.js -> domain specific api calls
import axiosInstance from "./index";

export const addMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/movies", payload);
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/movies/all");
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

export const updateMovie = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/movies/${id}`, payload);
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await axiosInstance.delete(`/movies/${id}`);
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

// user.js -> domain specific api calls
import axiosInstance from "./index";

export const addShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/shows", payload);
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

export const getShowsByMovieAndDate = async (movieId, date) => {
  try {
    const response = await axiosInstance.get(`/shows/by-movie-date?movieId=${movieId}&date=${date}`);
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

export const getShowsByTheatre = async (theatreId) => {
  try {
    const response = await axiosInstance.get(`/shows/by-theatre?theatreId=${theatreId}`);
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

export const getShowById = async (id) => {
  try {
    const response = await axiosInstance.get(`/shows/${id}`);
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};
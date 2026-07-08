// user.js -> domain specific api calls
import axiosInstance from "./index";

export const makePayment = async (payload) => {
  try {
    const response = await axiosInstance.post("/bookings/make-payment", payload);
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

export const bookShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/bookings/book-show", payload);
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

export const getBookingByUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/bookings/${id}`);
    return response.data;
  } catch (err) {
    return err.response.data || { success: false, message: err.message };
  }
};

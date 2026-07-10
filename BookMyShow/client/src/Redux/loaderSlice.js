import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: "loaderSlice",
    initialState: {
        loading: false,
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        }
    }
})

export default loaderSlice;
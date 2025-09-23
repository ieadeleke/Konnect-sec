import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    count: 0,
};

export const countSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCount: (state, action) => {
            state.count = action.payload
        },
    },
});

export const { updateCount } = countSlice.actions;

export default countSlice.reducer;
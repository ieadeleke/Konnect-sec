import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cart: false,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart = action.payload
        },
        updateCart: (state, action) => {
            state.cart = action.payload
        },
    },
});

export const { addToCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
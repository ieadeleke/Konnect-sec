import { createSlice } from "@reduxjs/toolkit";
const getCartByRestaurant = (restaurantId) => {
    const storedCart = localStorage.getItem(`restaurantCart_${restaurantId}`);
    return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
    items: [],
    restaurantId: null,
};

const restaurantCartSlice = createSlice({
    name: "restaurantCart",
    initialState,
    reducers: {
        setRestaurant(state, action) {
            const { restaurantId } = action.payload;
            state.restaurantId = restaurantId;

            const storedCart = getCartByRestaurant(restaurantId);

            state.items = storedCart.map(item => ({
                ...item,
                detail: item.detail || { public_price: item.public_price, discount: item.discount , product_name: item.product_name }, 
            }));
        },
        addToCart(state, action) {
            const { restaurantId, productId, quantity, public_price, discount, product_name, extras = [] } = action.payload;


            if (!state.restaurantId) {
                state.restaurantId = restaurantId;
                const storedCart = getCartByRestaurant(restaurantId);
                state.items = storedCart.map(item => ({
                    ...item,
                    detail: item.detail || { public_price: item.public_price, discount: item.discount, product_name: item.product_name },
                }));
            }


            const updatedExtras = extras.map(extra => {
                if (!extra.name) {
                    const extraDetail = extra.item || {}; 
                    extra.name = extraDetail.name || "Unknown Extra"; 
                }
                return extra;
            });


            const indexProductId = state.items.findIndex(item => item.productId === productId);

            if (indexProductId >= 0) {

                state.items[indexProductId].quantity += quantity;


                const existingExtras = state.items[indexProductId].extras || [];
                updatedExtras.forEach(extra => {
                    const extraIndex = existingExtras.findIndex(e => e.id === extra.id);
                    if (extraIndex >= 0) {
                        existingExtras[extraIndex].quantity += extra.quantity; 
                    } else {
                        existingExtras.push(extra); 
                    }
                });

                state.items[indexProductId].extras = existingExtras;
            } else {

                state.items.push({
                    productId,
                    quantity,
                    detail: {
                        public_price,
                        discount,
                        product_name,
                    },
                    extras: updatedExtras, 
                });
            }


            localStorage.setItem(`restaurantCart_${state.restaurantId}`, JSON.stringify(state.items));
        },

        changeQuantity(state, action) {
            const { productId, quantity, extras } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);

            if (indexProductId >= 0) {

                if (quantity > 0) {
                    state.items[indexProductId].quantity = quantity;
                } else {

                    state.items.splice(indexProductId, 1);
                }


                if (extras) {
                    state.items[indexProductId].extras = extras; 
                }
            }


            localStorage.setItem(
                `restaurantCart_${state.restaurantId}`,
                JSON.stringify(state.items)
            );
        }
    },
});

export const { setRestaurant, addToCart, changeQuantity } = restaurantCartSlice.actions;

export default restaurantCartSlice.reducer;

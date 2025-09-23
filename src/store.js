import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import profileSlice from './slices/profileSlice';
import updateCountSlice from './slices/updateCountSlice';
import { restaurantSlice } from './slices/restaurantSlice';
import restaurantCartReducer from './slices/restaurantCartSlice';
import authReducer from './slices/authSlice';
export default configureStore({
    reducer: {
        userCart: cartSlice,
        userProfile: profileSlice,
        updateCount: updateCountSlice,
        restaurant: restaurantSlice.reducer,
        restaurantCart: restaurantCartReducer,
        auth: authReducer,
    },
})
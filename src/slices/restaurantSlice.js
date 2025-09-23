import { createSlice } from "@reduxjs/toolkit";
export const restaurantSlice = createSlice({
	name: "restaurant",
	initialState: {
		selectedMenu: null,
		visible: false,
	},
	reducers: {
		update_selected_menu: (state, action) => {
			state.selectedMenu = action.payload;
		},
		update_visibility: (state, action) => {
			state.visible = action.payload;
		},
	},
});


export const {update_selected_menu, update_visibility} = restaurantSlice.actions;


export default restaurantSlice.reducer;
import { combineReducers } from "@reduxjs/toolkit";
import basketSlice from "./basketSlice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
	auth: authSlice,
	basket: basketSlice,
});

export default rootReducer;

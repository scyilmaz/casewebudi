import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
});

export const persistor = persistStore(store);

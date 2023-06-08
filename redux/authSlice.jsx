import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
  reducers: {
    setSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { setSuccess, setLogout, setUser } = authSlice.actions;

export default authSlice.reducer;

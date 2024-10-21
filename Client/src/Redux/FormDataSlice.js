import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  files: [],
  isAuth: false,
  isLoading: false,
};

export const FormDataReducer = createSlice({
  name: "FormReducer",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = String(action.payload).trim();
    },
    setPassword: (state, action) => {
      state.password = String(action.payload).trim();
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    clearFiles: (state) => {
      state.files = [];
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default FormDataReducer.reducer;
export const {
  setEmail,
  setPassword,
  setFiles,
  setAuth,
  clearFiles,
  setLoading,
} = FormDataReducer.actions;

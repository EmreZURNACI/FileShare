import { configureStore } from "@reduxjs/toolkit";
import FormDataReducer from "./FormDataSlice";

export const Store = configureStore({
  reducer: {
    FormReducer: FormDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["form/uploadFileSuccess", "form/uploadFileFailure"],
        ignoredActionPaths: ["payload"],
        ignoredPaths: [
          "FormReducer.files.0",
          "FormReducer.files",
          "payload",
          "payload.0",
        ],
      },
    }),
});

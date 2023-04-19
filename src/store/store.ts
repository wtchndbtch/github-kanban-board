import { configureStore } from "@reduxjs/toolkit";

import issueListsSlice from "./issueLists-slice";

export const store = configureStore({
  reducer: {
    issues: issueListsSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";

import issueListsSlice from "./issueLists-slice";
import repoInfoSlice from "./repoInfo-slice";

export const store = configureStore({
  reducer: {
    issues: issueListsSlice,
    repoInfo: repoInfoSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

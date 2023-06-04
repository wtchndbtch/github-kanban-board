import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  GetIssuesPayload,
  getRepoInfoAPI,
  RepoInfo,
  RepoInfoResponse,
} from "@/api";
import { saveRepoInfoToStorage } from "@/utils/localStorage";

interface RepoInfoSlice {
  repoInfo: RepoInfo | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: RepoInfoSlice = {
  repoInfo: null,
  isLoading: false,
  isError: false,
};

export const getRepoInfo = createAsyncThunk(
  "issues/getRepoInfo",

  async (urlPayload: GetIssuesPayload) => {
    const response = await getRepoInfoAPI(urlPayload);

    if (!response?.ok) {
      return;
    }

    const data: RepoInfoResponse = await response.json();
    const starsData: number = data.stargazers_count;

    let stars = starsData;

    if (starsData > 1000) {
      stars = +(starsData / 1000).toFixed(1);
    }

    const repoInfo: RepoInfo = {
      owner: data.owner.login,
      repo: data.name,
      stars,
    };

    saveRepoInfoToStorage(`${repoInfo.owner}${repoInfo.repo}`, repoInfo);

    return repoInfo;
  }
);

const repoInfoSlice = createSlice({
  name: "repoInfo",
  initialState,
  reducers: {
    getInitialRepoInfo: (state, action: PayloadAction<RepoInfo>) => {
      state.repoInfo = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(getRepoInfo.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.repoInfo = action.payload;
    });

    builder.addCase(getRepoInfo.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { getInitialRepoInfo } = repoInfoSlice.actions;

export default repoInfoSlice.reducer;

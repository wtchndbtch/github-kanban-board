import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getIssuesAPI, GetIssuesPayload, Issue } from "@/api";
import { IssueLists } from "@/interfaces";
import { buildIssue, getIssueState } from "@/utils";

interface issueListsSlice {
  issuesLists: IssueLists | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: issueListsSlice = {
  issuesLists: null,
  isLoading: false,
  isError: false,
};

export const getIssuesData = createAsyncThunk(
  "issues/getIssuesData",
  async (urlPayload: GetIssuesPayload) => {
    const response = await getIssuesAPI(urlPayload);

    const data: Issue[] = await response.json();

    const issueData = data.reduce<IssueLists>(
      (acc, issue) => {
        const newIssue = buildIssue(issue);
        const issueState = getIssueState(issue);

        acc[issueState].push(newIssue);

        return acc;
      },
      { todo: [], inProgress: [], done: [] }
    );

    console.log("🚀 ~ file: getIssues.ts:74 ~ issueData:", issueData);

    return issueData;
  }
);

const issueListsSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getIssuesData.pending, state => {
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(getIssuesData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.issuesLists = action.payload;
    });

    builder.addCase(getIssuesData.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {} = issueListsSlice.actions;

export default issueListsSlice.reducer;

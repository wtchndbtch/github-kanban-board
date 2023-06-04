import { UniqueIdentifier } from "@dnd-kit/core";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getIssuesAPI, GetIssuesPayload, Issue } from "@/api";
import { IssueLists } from "@/api";
import { Status } from "@/api";
import { buildIssue, getIssueState } from "@/utils";
import { saveIssuesDataToStorage } from "@/utils/localStorage";
import { sortIssuesById } from "@/utils/sortIssues";

interface issueListsSlice {
  issuesLists: null | IssueLists;
  // todo: Issue[] | null;
  // inProgress: Issue[] | null;
  // done: Issue[] | null;
  isLoading: boolean;
  isError: boolean;
}

interface UpdatePayload {
  updatedList: Issue[];
  status: Status;
}

interface MovePayload {
  issue: Issue;
  status: Status;
  overIndex: number;
}

interface RemovePayload {
  id: UniqueIdentifier;
  status: Status;
}

const initialState: issueListsSlice = {
  issuesLists: null,
  // todo: null,
  // inProgress: null,
  // done: null,
  isLoading: false,
  isError: false,
};

export const getIssuesData = createAsyncThunk(
  "issues/getIssuesData",

  async (urlPayload: GetIssuesPayload) => {
    const response = await getIssuesAPI(urlPayload);
    const data: Issue[] = await response!.json();

    const issueData = data.reduce<IssueLists>(
      (acc, issue) => {
        const newIssue = buildIssue(issue);
        const issueState = getIssueState(issue);

        acc[issueState].push(newIssue);

        return acc;
      },
      { todo: [], inProgress: [], done: [] }
    );

    const sortedIssues = sortIssuesById(issueData);

    saveIssuesDataToStorage(
      `${urlPayload.owner}${urlPayload.repo}`,
      sortedIssues
    );

    return sortedIssues;
  }
);

const issueListsSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    getInitialIssueLists: (state, action: PayloadAction<IssueLists>) => {
      // state.todo = action.payload.todo;
      // state.inProgress = action.payload.inProgress;
      // state.done = action.payload.done;
      state.issuesLists = action.payload;
    },

    updateIssueLists: (state, action: PayloadAction<UpdatePayload>) => {
      if (!state.issuesLists) return;

      const { updatedList, status } = action.payload;

      state.issuesLists = { ...state.issuesLists, [status]: updatedList };
      // state[status] = updatedList;
    },

    moveIssue: (state, action: PayloadAction<MovePayload>) => {
      if (!state.issuesLists) return;

      const { issue, status, overIndex } = action.payload;

      // const listToUpdate = state[status]
      const listToUpdate = state.issuesLists[status];

      listToUpdate.splice(overIndex, 0, issue);
      // state[status] = listToUpdate;
      state.issuesLists = { ...state.issuesLists, [status]: listToUpdate };
    },
    removeIssue: (state, action: PayloadAction<RemovePayload>) => {
      if (!state.issuesLists) return;
      const { id, status } = action.payload;

      //const listToUpdate = state[status] as Issue[];
      const listToUpdate = state.issuesLists![status];
      const updatedList = listToUpdate.filter(issue => issue.id !== id);

      // state[status] = updatedList;
      state.issuesLists = { ...state.issuesLists, [status]: updatedList };
    },

    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(getIssuesData.pending, state => {
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(getIssuesData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.issuesLists = action.payload;
      // state.todo = action.payload.todo;
      // state.inProgress = action.payload.inProgress;
      // state.done = action.payload.done;
    });

    builder.addCase(getIssuesData.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {
  getInitialIssueLists,
  updateIssueLists,
  moveIssue,
  removeIssue,
  setIsLoading,
  setIsError,
} = issueListsSlice.actions;

export default issueListsSlice.reducer;

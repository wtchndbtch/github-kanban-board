import { UniqueIdentifier } from "@dnd-kit/core";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getIssuesAPI,
  GetIssuesPayload,
  getRepoInfoAPI,
  Issue,
  RepoInfo,
  RepoInfoResponse,
} from "@/api";
import { IssueLists } from "@/api";
import { Status } from "@/components/Board/Board";
import { buildIssue, getIssueState } from "@/utils";
import { sortIssuesById } from "@/utils/sortIssues";

interface issueListsSlice {
  issuesLists: IssueLists | null;
  isLoading: boolean;
  isError: boolean;
  repoInfo: RepoInfo | null;
}

const initialState: issueListsSlice = {
  issuesLists: null,
  isLoading: false,
  isError: false,
  repoInfo: null,
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

    return sortIssuesById(issueData);
  }
);

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

    return repoInfo;
  }
);

const issueListsSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    updateIssueLists(
      state,
      action: {
        payload: {
          updatedList: Issue[];
          status: Status;
        };
      }
    ) {
      const { updatedList, status } = action.payload;

      if (!state.issuesLists) return;
      state.issuesLists[status] = updatedList;
    },

    moveIssue(
      state,
      action: {
        payload: {
          issue: Issue;
          status: Status;
          overIndex: number;
        };
      }
    ) {
      const { issue, status, overIndex } = action.payload;
      if (!state.issuesLists) return;
      const listToUpdate = state.issuesLists[status];

      listToUpdate.length === 0
        ? listToUpdate.push(issue)
        : listToUpdate.splice(overIndex, 0, issue);

      state.issuesLists = {
        [status]: listToUpdate,
        ...state.issuesLists,
      };
    },
    removeIssue(
      state,
      action: {
        payload: {
          id: UniqueIdentifier;
          status: Status;
        };
      }
    ) {
      const { id, status } = action.payload;
      if (!state.issuesLists) return;
      const updatedList: Issue[] = state.issuesLists[status].filter(
        issue => issue.id !== id
      );
      state.issuesLists = { ...state.issuesLists, [status]: updatedList };
    },

    setIsError(state, action) {
      if (state.isError === action.payload) return;
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
    });

    builder.addCase(getIssuesData.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });

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

export const { updateIssueLists, setIsError, moveIssue, removeIssue } =
  issueListsSlice.actions;

export default issueListsSlice.reducer;

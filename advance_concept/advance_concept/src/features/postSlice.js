import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    );

    const total = parseInt(response.headers["x-total-count"] || "100");
    return {
      posts: response.data,
      total,
    };
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId) => {
    //       sucess           fail => fail
    const [postResponse, commentsRespnose] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`),
      axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      ),
    ]);
    return { ...postResponse.data, comments: commentsRespnose.data };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    currentPost: null,
    status: "idle",
    error: null,
    searchTerm: "",
    currentPage: 1,
    totalPosts: 0,
    postsPerPage: 10,
    filter: {
      userId: null,
    },
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
      state.currentPage = 1;
    },
    clearFilter: (state) => {
      state.filter = { userId: null };
      state.searchTerm = "";
      state.currentPage = 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.posts;
        state.totalPosts = action.payload.total;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentPage = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setCurrentPage, setFilter, clearFilter } =
  postsSlice.actions;
export default postsSlice.reducer;

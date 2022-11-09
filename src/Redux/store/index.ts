import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import combineReducers from "../reducers/index";
import { store } from "../../App";

export default function configureAppStore(preloadedState = {}) {
  const store = configureStore({
    reducer: combineReducers,
    // middleware: [thunk],
    preloadedState,
  });
  return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

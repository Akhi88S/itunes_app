import { types } from "../types";
const initialState = {
  tracks: [], // tracks data but can be overrided(search filters)
  tracksReadOnlyData: [], //totalList of tracks - read only
  categories: [],
};
export const tracksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
      };
    case types.GET_INITIAL_TRACKS_DATA:
      return {
        ...state,
        tracksReadOnlyData: action.payload,
      };
    case types.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};

import { actionTypes } from "./actionTypes/actionTypes";

const intialState = {
  data: [],
  loading: false,
  error: null,
};

export default function MoviesGenreReducer(state = intialState, action) {
    switch (action.type) {
        case actionTypes.USER_DATA_SUCCESS:
          return {
            ...state,
            data: action.payload,
            loading: false,
            error: action.payload,
          };
        case actionTypes.USER_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.USER_DATA_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

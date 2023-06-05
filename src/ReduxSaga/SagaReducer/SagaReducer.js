import {
  FETCH_USER_DATA_ERROR,
  FETCH_USER_DATA_PENDING,
  FETCH_USER_DATA_SUCCESS,
  MOVIES_ID_DETAIL_ERROR,
  MOVIES_ID_DETAIL_PENDING,
  MOVIES_ID_DETAIL_SUCCESS,
  MOVIES_CAST_CREW_DETAIL_ERROR,
  MOVIES_CAST_CREW_DETAIL_SUCCESS,
  MOVIES_CAST_CREW_DETAIL_PENDING,
  MOVIES_BUDGET_REVENUE_DETAIL_ERROR,
  MOVIES_BUDGET_REVENUE_DETAIL_SUCCESS,
  MOVIES_BUDGET_REVENUE_DETAIL_PENDING,
  MOVIES_KEYWORDS_DETAIL_ERROR,
  MOVIES_KEYWORDS_DETAIL_SUCCESS,
  MOVIES_KEYWORDS_DETAIL_PENDING,
  MOVIES_REVIEWS_DETAIL_ERROR,
  MOVIES_REVIEWS_DETAIL_SUCCESS,
  MOVIES_REVIEWS_DETAIL_PENDING
} from "../actions/actions";

// for Api Fetching
const intialState = {
  data: [],
  moviesId: [],
  castCrew:[],
  budgetRevenue:[],
  keywordsData:[],
  reviewsData:[],
  loading: false,
  error: "",
};
export function SagaReducer(state = intialState, action) {
  switch (action.type) {
    case FETCH_USER_DATA_PENDING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case FETCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        data: [action.data],
        loading: false,
      };
    }
    case FETCH_USER_DATA_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case MOVIES_ID_DETAIL_PENDING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case MOVIES_ID_DETAIL_SUCCESS: {
      return {
        ...state,
        moviesId: [action.data],
        loading: false,
      };
    }
    case MOVIES_ID_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case MOVIES_CAST_CREW_DETAIL_PENDING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case MOVIES_CAST_CREW_DETAIL_SUCCESS: {
      return {
        ...state,
        castCrew: [action.data],
        loading: false,
      };
    }
    case MOVIES_CAST_CREW_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case MOVIES_BUDGET_REVENUE_DETAIL_PENDING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case MOVIES_BUDGET_REVENUE_DETAIL_SUCCESS: {
      return {
        ...state,
        budgetRevenue: [action.data],
        loading: false,
      };
    }
    case MOVIES_BUDGET_REVENUE_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case MOVIES_KEYWORDS_DETAIL_PENDING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case MOVIES_KEYWORDS_DETAIL_SUCCESS: {
      return {
        ...state,
        keywordsData: [action.data],
        loading: false,
      };
    }
    case MOVIES_KEYWORDS_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case MOVIES_REVIEWS_DETAIL_PENDING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case MOVIES_REVIEWS_DETAIL_SUCCESS: {
      return {
        ...state,
        reviewsData: [action.data],
        loading: false,
      };
    }
    case MOVIES_REVIEWS_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}

import { actionTypes } from "../actionTypes/actionTypes";
import { moviesGenreIds } from "../../Api's URL/apiUrl";
import axios from "axios";
export const fetchMoviesData = () => {
  return async function (dispatch) {
    dispatch({ type: actionTypes.USER_DATA_LOADING });
    const  {data} = await axios.get(moviesGenreIds).catch((err) => {
      dispatch({ type: actionTypes.USER_DATA_ERROR, payload: err.message });
    });
    dispatch({ type: actionTypes.USER_DATA_SUCCESS, payload: data });
  };
};

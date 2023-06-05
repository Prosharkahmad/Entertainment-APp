import { takeEvery, put } from "redux-saga/effects";
import {
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_PENDING,
  FETCH_USER_DATA_ERROR,
  MOVIES_ID_DETAIL_PENDING,
  MOVIES_ID_DETAIL_SUCCESS,
  MOVIES_ID_DETAIL_ERROR,
  MOVIES_CAST_CREW_DETAIL_SUCCESS,
  MOVIES_CAST_CREW_DETAIL_PENDING,
  MOVIES_CAST_CREW_DETAIL_ERROR,
  MOVIES_BUDGET_REVENUE_DETAIL_SUCCESS,
  MOVIES_BUDGET_REVENUE_DETAIL_ERROR,
  MOVIES_BUDGET_REVENUE_DETAIL_PENDING,
  MOVIES_KEYWORDS_DETAIL_ERROR,
  MOVIES_KEYWORDS_DETAIL_SUCCESS,
  MOVIES_KEYWORDS_DETAIL_PENDING,
  MOVIES_REVIEWS_DETAIL_SUCCESS,
  MOVIES_REVIEWS_DETAIL_ERROR,
  MOVIES_REVIEWS_DETAIL_PENDING,
} from "../actions/actions";

// here we will call appi in action then sent back to reducer sagaReducer
function* getProducts(action) {
  try {
    let data = yield fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=c12531a82a60035f2bcdef9bb2c8ff3c&language=en-US&with_genres=${action.payload}`
    );
    data = yield data.json();
    yield put({ type: FETCH_USER_DATA_SUCCESS, data });
  } catch (err) {
    yield put({ type: FETCH_USER_DATA_ERROR, error: err.message });
  }
  try {
    let data = yield fetch(
      `https://api.themoviedb.org/3/movie/${action.payload}/videos?api_key=c12531a82a60035f2bcdef9bb2c8ff3c&language=en-US`
    );
    data = yield data.json();
    yield put({ type: MOVIES_ID_DETAIL_SUCCESS, data });
  } catch (err) {
    yield put({ type: MOVIES_ID_DETAIL_ERROR, error: err.message });
  }
  try {
    let data = yield fetch(
      `https://api.themoviedb.org/3/movie/${action.payload}/credits?api_key=c12531a82a60035f2bcdef9bb2c8ff3c&language=en-US`
    );
    data = yield data.json();
    yield put({ type: MOVIES_CAST_CREW_DETAIL_SUCCESS, data });
  } catch (err) {
    yield put({ type: MOVIES_CAST_CREW_DETAIL_ERROR, error: err.message });
  }
  try {
    let data = yield fetch(
      `https://api.themoviedb.org/3/movie/${action.payload}?api_key=c12531a82a60035f2bcdef9bb2c8ff3c&language=en-US`
    );
    data = yield data.json();
    // console.log(data);
    yield put({ type: MOVIES_BUDGET_REVENUE_DETAIL_SUCCESS, data });
  } catch (err) {
    yield put({ type: MOVIES_BUDGET_REVENUE_DETAIL_ERROR, error: err.message });
  }
  try {
    let data = yield fetch(
      `https://api.themoviedb.org/3/movie/${action.payload}/keywords?api_key=c12531a82a60035f2bcdef9bb2c8ff3c&language=en-US`
    );
    data = yield data.json();
    // console.log(data);
    yield put({ type: MOVIES_KEYWORDS_DETAIL_SUCCESS, data });
  } catch (err) {
    yield put({ type: MOVIES_KEYWORDS_DETAIL_ERROR, error: err.message });
  }
  try {
    let data = yield fetch(
      `https://api.themoviedb.org/3/movie/${action.payload}/reviews?api_key=c12531a82a60035f2bcdef9bb2c8ff3c&language=en-US`
    );
    data = yield data.json();
    // console.log(data);
    yield put({ type: MOVIES_REVIEWS_DETAIL_SUCCESS, data });
  } catch (err) {
    yield put({ type: MOVIES_REVIEWS_DETAIL_ERROR, error: err.message });
  }
}
function* productSaga() {
  yield takeEvery(FETCH_USER_DATA_PENDING, getProducts);
  yield takeEvery(MOVIES_ID_DETAIL_PENDING, getProducts);
  yield takeEvery(MOVIES_CAST_CREW_DETAIL_PENDING, getProducts);
  yield takeEvery(MOVIES_BUDGET_REVENUE_DETAIL_PENDING, getProducts);
  yield takeEvery(MOVIES_KEYWORDS_DETAIL_PENDING, getProducts);
  yield takeEvery(MOVIES_REVIEWS_DETAIL_PENDING, getProducts);
}
export default productSaga;

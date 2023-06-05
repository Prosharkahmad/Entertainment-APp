import {
  FETCH_USER_DATA_PENDING,
  MOVIES_BUDGET_REVENUE_DETAIL_PENDING,
  MOVIES_KEYWORDS_DETAIL_PENDING,
  MOVIES_REVIEWS_DETAIL_PENDING,
  MOVIES_ID_DETAIL_PENDING,
  MOVIES_CAST_CREW_DETAIL_PENDING
} from "./actions";

export function productList(detail) {
  return {
    type: FETCH_USER_DATA_PENDING,
    payload: detail,
  };
}
export function moviesId(detail) {
  return {
    type: MOVIES_ID_DETAIL_PENDING,
    payload: detail,
  };
}
export function castCrew(detail) {
  return {
    type: MOVIES_CAST_CREW_DETAIL_PENDING,
    payload: detail,
  };
}
export function budgetRevenue(detail) {
  return {
    type: MOVIES_BUDGET_REVENUE_DETAIL_PENDING,
    payload: detail,
  };
}
export function keywordsData(detail) {
  return {
    type: MOVIES_KEYWORDS_DETAIL_PENDING,
    payload: detail,
  };
}
export function reviewsData(detail) {
  return {
    type: MOVIES_REVIEWS_DETAIL_PENDING,
    payload: detail,
  };
}

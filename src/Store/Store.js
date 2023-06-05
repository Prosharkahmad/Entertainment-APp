import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { SagaReducer } from "../ReduxSaga/SagaReducer/SagaReducer";
import productSaga from "../ReduxSaga/AuthenticationReduxSaga/UserAuthenticationSaga";
import thunk from "redux-thunk";
import MoviesGenreReducer from "../ReduxThunk/Reducer";
import MoviesReducer from "../ReduxToolkit/MoviesReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";


const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const reducer = combineReducers({
  MoviesGenreReducer: MoviesGenreReducer,
  SagaReducer: SagaReducer,
  MoviesReducer: MoviesReducer,
});
const persistReducerr = persistReducer(persistConfig, reducer);
export default configureStore({
  // reducer: { SagaReducer,MoviesGenreReducer },
  
  reducer: persistReducerr,

  // MoviesGenreReducer:MoviesGenreReducer,SagaReducer:SagaReducer, MoviesReducer:MoviesReducer

  middleware: () => [sagaMiddleware, thunk],
  
});
sagaMiddleware.run(productSaga);

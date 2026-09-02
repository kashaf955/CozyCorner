import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import { productReducer } from "./reducers/productReducer.js";
import { productDetailsReducer } from "./reducers/productReducer.js";
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
});

const initialState = {};
const middleware = [thunk];

const composeEnhancers =
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import {
  productReducer,
  productDetailsReducer,
  filterReducer,
} from "./reducers/productReducer.js";
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer.js";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  filters: filterReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
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

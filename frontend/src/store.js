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
import { cartReducer } from "./reducers/cartReducer.js";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducer.js";
import {
  productsReducer,
  newProductReducer,
  productAdminReducer,
  allUsersReducer,
  userAdminReducer,
} from "./reducers/adminReducer.js";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  filters: filterReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  adminProducts: productsReducer,
  newProduct: newProductReducer,
  productAdmin: productAdminReducer,
  allUsers: allUsersReducer,
  userAdmin: userAdminReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingInfoFromStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingInfo: shippingInfoFromStorage,
  },
};
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

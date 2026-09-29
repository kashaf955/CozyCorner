import {
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  CLEAR_ERRORS,
} from "../constants/adminConstants.js";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ADMIN_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case ADMIN_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case ADMIN_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case NEW_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case NEW_PRODUCT_RESET:
      return { ...state, success: false };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const productAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return { ...state, loading: false, isDeleted: action.payload };
    case UPDATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, isUpdated: action.payload };
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PRODUCT_RESET:
      return { ...state, isDeleted: false };
    case UPDATE_PRODUCT_RESET:
      return { ...state, isUpdated: false };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return { ...state, loading: true };
    case ALL_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case ALL_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const userAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, isUpdated: action.payload };
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, isDeleted: action.payload };
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_USER_RESET:
      return { ...state, isUpdated: false };
    case DELETE_USER_RESET:
      return { ...state, isDeleted: false };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

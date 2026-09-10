import api from "../api.js";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  FILTER_PRODUCTS_REQUEST,
  FILTER_PRODUCTS_SUCCESS,
  FILTER_PRODUCTS_FAIL,
  CLEAR_FILTERS,
} from "../constants/productConstants.js";

export const getProducts =
  (page = 1, limit = 8, keyword = "", price = [0, 25000]) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      let link = `/products?page=${page}&limit=${limit}`;

      if (keyword) {
        link += `&keyword=${encodeURIComponent(keyword)}`;
      }

      if (price && price.length === 2) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }

      const { data } = await api.get(link);
      dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response?.data?.message || "Failed to load products",
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await api.get(`/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || "Failed to load product details",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const filterProducts = (page = 1, limit = 8, keyword = "", price = [0, 25000]) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_PRODUCTS_REQUEST });
    let link = `/products?page=${page}&limit=${limit}`;
    if (keyword) {
      link += `&keyword=${encodeURIComponent(keyword)}`;
    }
    if (price && price.length === 2) {
      link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    }
    const { data } = await api.get(link);
    dispatch({ type: FILTER_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FILTER_PRODUCTS_FAIL, payload: error.response?.data?.message || "Failed to filter products" });
  }
};  
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  UPDATE_CART_QUANTITY,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
} from "../constants/cartConstants.js";

export const addItemsToCart = (product, quantity = 1) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url || product.image || "",
      stock: product.stock ?? 99,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const updateCartQuantity = (id, quantity) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_CART_QUANTITY,
    payload: { product: id, quantity },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
  localStorage.removeItem("cartItems");
};

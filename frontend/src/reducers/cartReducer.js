import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  UPDATE_CART_QUANTITY,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
} from "../constants/cartConstants.js";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const item = action.payload;
      const exists = state.cartItems.find((i) => i.product === item.product);
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === exists.product
              ? { ...i, quantity: Math.min(i.stock || 99, i.quantity + item.quantity) }
              : i
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };
    }
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.product === action.payload.product
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case SAVE_SHIPPING_INFO:
      return { ...state, shippingInfo: action.payload };
    case CLEAR_CART:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

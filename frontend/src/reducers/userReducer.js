import {
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = {user: {}}, action) => {
switch(action.type) {
    case LOGIN_REQUEST:
        return {
            loading: true,
            isAuthenticated: false,
        };
    case LOGIN_SUCCESS:
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
        };
    case LOGIN_FAIL:
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            message: action.payload,
        };
    case REGISTER_REQUEST:
        return {
            loading: true,
            isAuthenticated: false,
        };
    case REGISTER_SUCCESS:
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
        };
    case REGISTER_FAIL:
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            message: action.payload,
        };
    case LOAD_USER_REQUEST:
        return {
            ...state,
            loading: true,
        };
    case LOAD_USER_SUCCESS:
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
        };
    case LOAD_USER_FAIL:
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            message: action.payload,
        };
    case LOGOUT_SUCCESS:
        return {
            loading: false,
            isAuthenticated: false,
            user: null,
        };
    case LOGOUT_FAIL:
        return {
            ...state,
            loading: false,
            message: action.payload,
        };
    case CLEAR_ERRORS:
        return {
            ...state,
            message: null,
        };
    default:
        return state;
    }
}
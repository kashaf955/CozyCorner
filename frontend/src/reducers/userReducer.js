import { CLEAR_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL } from "../constants/userConstants";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from "../constants/userConstants";

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
            loading: false,
            isAuthenticated: true
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
            user: action.payload,
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
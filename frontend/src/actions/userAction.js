import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL } from "../constants/userConstants";
import api from "../api.js";
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        const { data } = await api.post("/login", { email, password }, config);
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        dispatch({ type: CLEAR_ERRORS });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message || "Login failed" });
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        const { data } = await api.post("/register", { name, email, password }, config);
        dispatch({ type: REGISTER_SUCCESS, payload: data.user });
        dispatch({ type: CLEAR_ERRORS });
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message || "Register failed" });
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        const { data } = await api.get("/api/v1/me", config);
        dispatch({ type: LOAD_USER_SUCCESS, payload: data });
        dispatch({ type: CLEAR_ERRORS });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message || "Failed to load user" });
    }
}
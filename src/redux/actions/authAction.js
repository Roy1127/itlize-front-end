import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_ROOT } from "../../assets/constants/constants";

import * as actionTypes from "../../assets/constants/actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, decoded) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: decoded.userId,
    username: decoded.sub,
    creationTime: decoded.create,
    title: decoded.title
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (values) => {
  return (dispatch) => {
    const userFormData = {
      username: values.username,
      password: values.password
    }

    const options = {
      url: `${API_ROOT}/login`,
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      data: userFormData,
      withCredentials: true,
    };

    axios(options)
      .then((response) => {
        if (response.data.success) {
          return response.data;
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log(data);
        var decoded = jwt_decode(data.token);
        console.log(decoded);
        dispatch(authSuccess(data.token, decoded));
      })
      .catch((err) => {
        console.error(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

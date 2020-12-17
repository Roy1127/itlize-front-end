import * as actionTypes from "../../assets/constants/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  isAuthenticated: false,
  error: null,
  token: null,
  userId: -1,
  user: { username: "Roy", title: "", creationTime: "" }

};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    user: {
      username: action.username, title: action.title, creationTime: action.creationTime
    },
    error: null,
    isAuthenticated: true,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  });
};

export const authReducer = (state = initialState, action) => {
  const { isAuthenticated, user } = state /* action.payload */;
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.LOGIN:
      return isAuthenticated ? user : null;
    default:
      return state;
  }
};
import { combineReducers } from "redux";
import { authReducer } from "../reducers/authReducer";
import { resrcReducer } from "../reducers/resrcReducer";
import { projectReducer } from "../reducers/projectReducer";


export default combineReducers({ authReducer, resrcReducer, projectReducer });
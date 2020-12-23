import * as actionTypes from "../../assets/constants/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  datasource: [],
};


const loadResources = (state, action) => {
  return updateObject(state, {
    datasource: action.datasource,
  });
};

export const resrcReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_RESOURCE: return loadResources(state, action);
    // case actionTypes.ADD_COLUMN: return authLogout(state, action);
    // case actionTypes.IMPORT_CSV: return 
    // case actionTypes.UPDATE_VALUE: 
    default:
      return state;
  }
};
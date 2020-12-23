import * as actionTypes from "../../assets/constants/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  projdatasource: [],
};


const loadProjResources = (state, action) => {
  return updateObject(state, {
    projdatasource: action.datasource[0].resources,
  });
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_PROJECT: return loadProjResources(state, action);
    // case actionTypes.ADD_COLUMN: return authLogout(state, action);
    // case actionTypes.IMPORT_CSV: return 
    // case actionTypes.UPDATE_VALUE: 
    default:
      return state;
  }
};
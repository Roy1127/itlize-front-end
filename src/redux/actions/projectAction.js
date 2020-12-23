import axios from "axios";
import { API_ROOT } from "../../assets/constants/constants";

import * as actionTypes from "../../assets/constants/actionTypes";

export const setResrcState = (resources) => {
  return {
    type: actionTypes.LOAD_PROJECT,
    datasource: resources,
  };
};

export const getProjResource = (token) => {
  return (dispatch) => {
    const options = {
      url: `${API_ROOT}/project/getall`,
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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
        console.log(data.projs);
        dispatch(setResrcState(data.projs));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const addResrc = (token, values) => {
  return (dispatch) => {
    const jsonObject = {
      id: 1,
      resourcesId: values,
    };

    const addOptions = {
      url: `${API_ROOT}/project/add`,
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: jsonObject,
      withCredentials: true,
    };

    const getOptions = {
      url: `${API_ROOT}/project/getall`,
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    };

    axios(addOptions)
      .then((response) => {
        if (response.data.success) {
          return response.data;
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log(data.message);
        return axios(getOptions);
      })
      .then((response) => {
        if (response.data.success) {
          return response.data;
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log(data.projs);
        dispatch(setResrcState(data.projs));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const deleteResrc = (token, values) => {
  return (dispatch) => {
    const jsonObject = {
      id: 1,
      resourcesId: values,
    };

    const addOptions = {
      url: `${API_ROOT}/project/delete`,
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: jsonObject,
      withCredentials: true,
    };

    const getOptions = {
      url: `${API_ROOT}/project/getall`,
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    };

    axios(addOptions)
      .then((response) => {
        if (response.data.success) {
          return response.data;
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log(data.message);
        return axios(getOptions);
      })
      .then((response) => {
        if (response.data.success) {
          return response.data;
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log(data.projs);
        dispatch(setResrcState(data.projs));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

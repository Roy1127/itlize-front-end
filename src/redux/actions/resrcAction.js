import axios from "axios";
import { API_ROOT } from "../../assets/constants/constants";

import * as actionTypes from "../../assets/constants/actionTypes";

// export const authSuccess = (token, decoded) => {
//   return {
//     type: actionTypes.AUTH_SUCCESS,
//     idToken: token,
//     userId: decoded.userId,
//     username: decoded.sub,
//     creationTime: decoded.create,
//     title: decoded.title,
//   };
// };

export const setResrcState = (resources) => {
  return {
    type: actionTypes.LOAD_RESOURCE,
    datasource: resources,
  };
};

export const getResource = (token) => {
  return (dispatch) => {
    const options = {
      url: `${API_ROOT}/resource/findAll`,
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
        console.log(data.resources);
        dispatch(setResrcState(data.resources));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const addRow = (token) => {
  return (dispatch) => {
    const options = {
      url: `${API_ROOT}/resource/insert`,
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    };

    const optionGet = {
      url: `${API_ROOT}/resource/findAll`,
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
        console.log(data.message);
        return axios(optionGet);
      })
      .then((response) => {
        if (response.data.success) {
          return response.data;
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log(data.resources);
        dispatch(setResrcState(data.resources));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const update = (token, values) => {

  const jsonObject = {
    resrcId: values.key,
    name: values.name,
    value: values.value
  }

  return (dispatch) => {
    const options = {
      url: `${API_ROOT}/resource/update`,
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: jsonObject,
      withCredentials: true,
    };

    const optionGet = {
      url: `${API_ROOT}/resource/findAll`,
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
        console.log(data.message);
        return axios(optionGet);
      })
      .then((response) => {
        if (response.data.success) {
          return response.data;
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log(data.resources);
        dispatch(setResrcState(data.resources));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const addColumn = (token, value) => {

  return (dispatch) => {
    const options = {
      url: `${API_ROOT}/resource/addColumn?columnName=${value}`,
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    };

    const optionGet = {
      url: `${API_ROOT}/resource/findAll`,
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
        console.log(data.message);
        return axios(optionGet);
      })
      .then((response) => {
        if (response.data.success) {
          return response.data;
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log(data.resources);
        dispatch(setResrcState(data.resources));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const importCSV = (token, value) => {

  return (dispatch) => {
    const options = {
      url: `${API_ROOT}/resource/csv?path=${value}`,
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    };

    const optionGet = {
      url: `${API_ROOT}/resource/findAll`,
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
        console.log(data.message);
        return axios(optionGet);
      })
      .then((response) => {
        if (response.data.success) {
          return response.data;
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log(data.resources);
        dispatch(setResrcState(data.resources));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};




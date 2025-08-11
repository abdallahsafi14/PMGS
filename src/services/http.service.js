import axios from "axios";
import environment from "../environment";
import { handleError } from "./error.service";

const getConfig = (isToken) => {
  // console.log(JSON.parse(localStorage.getItem(environment.TOKEN_KEY)))
  if (isToken) {
    return {
      headers: {
        "Time-Zone-Offset": new Date().getTimezoneOffset() * 60 * -1,
        Authorization: `Bearer ${localStorage.getItem(environment.TOKEN_KEY)}`,
      },
    };
  } else
    return {
      headers: {
        "Time-Zone-Offset": new Date().getTimezoneOffset() * 60 * -1,
      },
    };
};

const getPostFormConfig = (isToken) => {
  if (isToken)
    return {
      headers: {
        "Time-Zone-Offset": new Date().getTimezoneOffset() * 60,
        Authorization: `Bearer ${localStorage.getItem(environment.TOKEN_KEY)}`,
        "Content-Type": "multipart/form-data",
      },
    };
  else
    return {
      headers: {
        "Time-Zone-Offset": new Date().getTimezoneOffset() * 60,
        "Content-Type": "multipart/form-data",
      },
    };
};

export const GET = async (apiPath, isToken) => {
  let res = {};
  await axios
    .get(`${environment.API_URL}/${apiPath}`, getConfig(isToken))
    .then((response) => {
      res.status = response.status;
      res.data = response.data;
    })
    .catch((error) => {
      handleError(error?.response);
    });
  return res;
};

export const GETWithParams = async (apiPath, requestParams, isToken) => {
  let res = {};
  try {
    await axios
      .get(`${environment.API_URL}/${apiPath}`, {
        params: requestParams,
        ...getConfig(isToken),
      })
      .then((response) => {
        res.status = response?.status;
        res.data = response?.data;
      });
  } catch (error) {
    console.log(error);
    handleError(error?.response);
  }
  return res;
};

export const POST = async (apiPath, requestBody, isToken) => {
  let res = {};

  await axios
    .post(`${environment.API_URL}/${apiPath}`, requestBody, getConfig(isToken))
    .then((response) => {
      res.status = response.status;
      res.data = response.data;
    })
    .catch((error) => {
      console.log("handling error:", error);
      handleError(error?.response);
    });
  return res;
};

export const POSTForm = async (apiPath, requestBody, isToken) => {
  let res = {};
  await axios
    .post(
      `${environment.API_URL}/${apiPath}`,
      requestBody,
      getPostFormConfig(isToken)
    )
    .then((response) => {
      res.status = response.status;
      res.data = response.data;
    })
    .catch((error) => {
      handleError(error?.response);
    });
  return res;
};

export const PUT = async (apiPath, requestBody, isToken) => {
  let res = {};
  try {
    await axios
      .put(`${environment.API_URL}/${apiPath}`, requestBody, getConfig(isToken))
      .then((response) => {
        res.status = response?.status;
        res.data = response?.data;
      });
  } catch (error) {
    handleError(error?.response);
  }
  return res;
};

export const PUTForm = async (apiPath, requestBody, isToken) => {
  let res = {};
  await axios
    .put(
      `${environment.API_URL}/${apiPath}`,
      requestBody,
      getPostFormConfig(isToken)
    )
    .then((response) => {
      res.status = response.status;
      res.data = response.data;
    })
    .catch((error) => {
      handleError(error?.response);
    });
  return res;
};

export const PATCH = async (apiPath, requestBody, isToken) => {
  let res = {};
  try {
    await axios
      .patch(
        `${environment.API_URL}/${apiPath}`,
        requestBody,
        getConfig(isToken)
      )
      .then((response) => {
        res.status = response?.status;
        res.data = response?.data;
      });
  } catch (error) {
    handleError(error?.response);
    console.log(error);
  }
  return res;
};

export const PATCHForm = async (apiPath, requestBody, isToken) => {
  let res = {};
  try {
    await axios
      .patch(
        `${environment.API_URL}/${apiPath}`,
        requestBody,
        getPostFormConfig(isToken)
      )
      .then((response) => {
        res.status = response?.status;
        res.data = response?.data;
      });
  } catch (error) {
    handleError(error?.response);
  }
  return res;
};

export const DELETE = async (apiPath, isToken) => {
  let res = {};
  try {
    await axios
      .delete(`${environment.API_URL}/${apiPath}`, getConfig(isToken))
      .then((response) => {
        res.status = response?.status;
        res.data = response?.data;
      });
  } catch (error) {
    handleError(error?.response);
    console.log(error);
  }
  return res;
};

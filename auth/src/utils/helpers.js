import Axios from 'axios';

const axios = Axios.create();

export const cors = (options = {}) => {
  return (req, res, next) => {
    if (req.method.toLowerCase() === 'options') {
      return res.sendStatus(204);
    }
    next();
  };
};

export const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  errors = null
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message: message || 'success',
    data,
    errors,
  });
};

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const payload = {
      status: 0,
      message: error.message,
      data: error.stack,
    };

    if (error.response) {
      Object.assign(payload, {
        status: error.response.status,
        // @ts-ignore
        message: error.response.data?.message || error.response.statusText,
        data: error.response.data,
      });

      if (error.response.data && typeof error.response.data !== 'string') {
        Object.assign(payload, error.response.data);
      }
    } else {
      payload.message = error.message;
    }

    return Promise.reject(payload);
  }
);

export default axios;

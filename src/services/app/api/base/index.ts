import axios from "axios";

import {
  interceptorRequest,
  interceptorRequestError,
  interceptorResponse,
  interceptorResponseError,
} from "../../utils/interceptor";

const BASE_URL = process.env.APP_API_BASE_URL;

const apiBase = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiBase.interceptors.request.use(interceptorRequest, interceptorRequestError);

apiBase.interceptors.response.use(
  interceptorResponse,
  interceptorResponseError
);

export { apiBase };

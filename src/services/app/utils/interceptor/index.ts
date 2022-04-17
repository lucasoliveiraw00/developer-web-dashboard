import * as Sentry from "@sentry/browser";

import {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

export function interceptorRequest(
  config: AxiosRequestConfig
): AxiosRequestConfig {
  Sentry.setExtra("Interceptor Request", config);
  return config;
}

export function interceptorRequestError(
  error: AxiosError
): AxiosPromise<AxiosError> {
  Sentry.captureException(error);

  return Promise.reject(error);
}

export function interceptorResponse(response: AxiosResponse): AxiosResponse {
  Sentry.setExtra("Interceptor Response", response);

  return response;
}

export function interceptorResponseError(
  error: AxiosError
): AxiosPromise<AxiosError> {
  const statusCode = error.response?.status ?? 0;

  Sentry.captureException(error);

  return Promise.reject(error);
}

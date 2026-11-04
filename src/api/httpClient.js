import { axiosInstance } from "./axiosInstance";
import { normalizeHttpError } from "./errorNormalizer";

function buildResponse(response) {
  return {
    ok: true,
    status: response.status,
    data: response.data,
    headers: response.headers,
  };
}

async function request(config) {
  try {
    const response = await axiosInstance.request(config);
    return buildResponse(response);
  } catch (error) {
    throw normalizeHttpError(error);
  }
}

function mergeRequestConfig(options = {}) {
  const { headers, params, signal, config } = options;

  return {
    ...(config || {}),
    headers: {
      ...(config?.headers || {}),
      ...(headers || {}),
    },
    params: params || config?.params,
    signal: signal || config?.signal,
  };
}

export const httpClient = {
  get(url, options = {}) {
    return request({
      method: "GET",
      url,
      ...mergeRequestConfig(options),
    });
  },

  post(url, body, options = {}) {
    return request({
      method: "POST",
      url,
      data: body,
      ...mergeRequestConfig(options),
    });
  },

  put(url, body, options = {}) {
    return request({
      method: "PUT",
      url,
      data: body,
      ...mergeRequestConfig(options),
    });
  },

  patch(url, body, options = {}) {
    return request({
      method: "PATCH",
      url,
      data: body,
      ...mergeRequestConfig(options),
    });
  },

  delete(url, options = {}) {
    return request({
      method: "DELETE",
      url,
      ...mergeRequestConfig(options),
    });
  },
};


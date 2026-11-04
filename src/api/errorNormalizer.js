const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

const STATUS_MESSAGES = {
  401: "Your session expired. Please sign in again.",
  403: "You do not have permission to perform this action.",
  422: "Some submitted data is invalid. Please review and try again.",
  500: "A server error occurred. Please try again later.",
};

function getSafeMessage(status, serverMessage) {
  if (STATUS_MESSAGES[status]) {
    return STATUS_MESSAGES[status];
  }

  if (status && status < 500 && typeof serverMessage === "string") {
    return serverMessage;
  }

  return DEFAULT_ERROR_MESSAGE;
}

function extractFieldErrors(errorData) {
  const validationErrors =
    errorData?.errors || errorData?.fieldErrors || errorData?.validationErrors;

  if (!validationErrors || typeof validationErrors !== "object") {
    return null;
  }

  return validationErrors;
}

export function normalizeHttpError(error) {
  if (error?.isNormalizedError) {
    return error;
  }

  if (error?.code === "ERR_CANCELED") {
    return {
      isNormalizedError: true,
      status: null,
      code: "REQUEST_CANCELED",
      message: "Request was cancelled.",
      fieldErrors: null,
      isNetworkError: false,
      isCanceled: true,
    };
  }

  const status = error?.response?.status ?? null;
  const errorData = error?.response?.data;
  const serverMessage =
    typeof errorData?.message === "string" ? errorData.message : null;

  return {
    isNormalizedError: true,
    status,
    code:
      errorData?.code ||
      error?.code ||
      (status ? `HTTP_${status}` : "NETWORK_ERROR"),
    message: getSafeMessage(status, serverMessage),
    fieldErrors: status === 422 ? extractFieldErrors(errorData) : null,
    isNetworkError: !status,
    isCanceled: false,
  };
}


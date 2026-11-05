import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function showGuardToast(toastConfig) {
  if (!toastConfig?.message) {
    return;
  }

  const toastOptions = {
    id: toastConfig.id,
    duration: toastConfig.duration || 2600,
  };

  if (toastConfig.type === "success") {
    toast.success(toastConfig.message, toastOptions);
    return;
  }

  if (toastConfig.type === "error" || !toastConfig.type) {
    toast.error(toastConfig.message, toastOptions);
    return;
  }

  toast(toastConfig.message, toastOptions);
}

export default function GuardRedirect({ to, replace = true, state, toastConfig }) {
  useEffect(() => {
    showGuardToast(toastConfig);
  }, [
    toastConfig?.id,
    toastConfig?.message,
    toastConfig?.type,
    toastConfig?.duration,
  ]);

  return <Navigate to={to} replace={replace} state={state} />;
}

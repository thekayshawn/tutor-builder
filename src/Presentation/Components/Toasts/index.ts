import * as React from "react";

export { default as ToastLoading } from "./ToastLoading";
export { default as ToastSuccess } from "./ToastSuccess";
export { default as ToastFailure } from "./ToastFailure";

export type ToastProps = {
  description?: string;
  children: React.ReactNode;
  closeToast?: () => unknown;
};

import * as React from "react";
import strings from "./strings";
import toastConfig from "@Core/Config/toastConfig";
import { ToastOptions, toast } from "react-toastify";
import {
  ToastFailure,
  ToastLoading,
  ToastSuccess,
} from "@Presentation/Components/Toasts";

type ToastMethod = (
  content?: {
    message?: string;
    description?: string;
  },
  options?: ToastOptions<{}> | undefined
) => unknown;

const betterToast: Record<string, ToastMethod> = {
  error: ({ message, description } = {}, options) => {
    toast.dismiss();
    toast.error(
      <ToastFailure {...{ description }}>
        {message || strings.DEFAULT_ERROR_MESSAGE}
      </ToastFailure>,
      { ...toastConfig, ...options }
    );
  },
  success: ({ message, description } = {}, options) => {
    toast.dismiss();
    toast.success(
      <ToastSuccess {...{ description }}>
        {message || strings.DEFAULT_SUCCESS_MESSAGE}
      </ToastSuccess>,
      { ...toastConfig, ...options }
    );
  },
  loading: (options) => {
    toast.dismiss();
    toast.loading(<ToastLoading />, { ...toastConfig, ...options });
  },
};

export default betterToast;

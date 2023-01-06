import * as React from "react";
import { Spinner, Toast, ToastHeader } from "reactstrap";
import { ToastProps } from ".";

export default function ToastLoading({
  closeToast,
}: Pick<ToastProps, "closeToast">) {
  return (
    <Toast className="border-1" onClick={closeToast}>
      <ToastHeader icon={<Spinner size="sm">Loading...</Spinner>}>
        Loading...
      </ToastHeader>
    </Toast>
  );
}

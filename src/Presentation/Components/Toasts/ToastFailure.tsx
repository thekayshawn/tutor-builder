import * as React from "react";
import { ToastProps } from ".";
import { IconCircleX } from "@tabler/icons";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

export default function ToastFailure({
  children,
  closeToast,
  description,
}: ToastProps) {
  return (
    <Toast className="border-1" onClick={closeToast}>
      <ToastHeader icon={<IconCircleX fill="red" className="text-white" />}>
        {children}
      </ToastHeader>
      {description && <ToastBody>{description}</ToastBody>}
    </Toast>
  );
}

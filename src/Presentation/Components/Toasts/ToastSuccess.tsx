import * as React from "react";
import { ToastProps } from ".";
import { IconCircleCheck } from "@tabler/icons";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

export default function ToastSuccess({
  children,
  closeToast,
  description,
}: ToastProps) {
  return (
    <Toast className="border-1" onClick={closeToast}>
      <ToastHeader
        icon={<IconCircleCheck fill="green" className="text-white" />}
      >
        {children}
      </ToastHeader>
      {description && <ToastBody>{description}</ToastBody>}
    </Toast>
  );
}

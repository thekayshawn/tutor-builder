import * as React from "react";
import { IconX } from "@tabler/icons";
import { CardHeader, CardHeaderProps, CardTitle } from "reactstrap";

export type ModalHeaderProps = {
  /**
   * Title of the modal
   * @type {string}
   */
  title: string;

  /**
   * Callback method to close the modal when the close button gets clicked.
   * @returns {void}
   */
  onClose: () => void;
} & CardHeaderProps;

export default function ModalHeader({
  title,
  onClose,
  className = "",
  ...props
}: ModalHeaderProps) {
  return (
    <CardHeader
      {...props}
      className={`p-3 w-100 bg-white d-flex align-items-center justify-content-between ${className}`}
    >
      <CardTitle>{title}</CardTitle>
      <button type="button" className="btn fs-5" onClick={() => onClose()}>
        <IconX />
      </button>
    </CardHeader>
  );
}

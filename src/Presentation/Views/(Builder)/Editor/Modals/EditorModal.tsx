import * as React from "react";
import { Modal, ModalBody, ModalProps } from "reactstrap";
import { ModalHeader } from "@Presentation/Components/Modals";
import type { ModalHeaderProps } from "@Presentation/Components/Modals";

export type EditorModalProps = React.PropsWithChildren<{
  /**
   * Non-Nullable ID to use with the modal and the control button.
   */
  id: string;

  /**
   * The icon to use in the button.
   */
  icon: React.ReactNode;

  title: ModalHeaderProps["title"];

  /**
   * Whether the modal is open or not.
   */
  isOpen: boolean;

  /**
   * Method to reverse the isOpen state.
   */
  toggleIsOpen: () => void;

  /**
   * Additional props for the modal's control button.
   */
  controlProps?: React.ComponentPropsWithoutRef<"button">;
}> &
  Omit<ModalProps, "id" | "title">;

/**
 * Modal for the content builder's editor.
 * The modal manages it's toggle state itself and exposes the toggle function
 * for external control.
 *
 * @param {EditorModalProps} props
 *
 * @returns {JSX.Element}
 */
export default function EditorModal({
  id,
  icon,
  title,
  isOpen,
  children,
  toggleIsOpen,
  controlProps,
}: EditorModalProps): JSX.Element {
  return (
    <>
      <button
        {...controlProps}
        onClick={toggleIsOpen}
        aria-controls={`#${id}`}
        className={`btn border rounded bg-light fs-5 ${controlProps?.className}`}
      >
        {icon}
      </button>
      <Modal {...{ isOpen }} toggle={toggleIsOpen}>
        <ModalHeader {...{ title }} onClose={toggleIsOpen} />
        <ModalBody className="text-end">{children}</ModalBody>
      </Modal>
    </>
  );
}

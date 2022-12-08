import * as React from "react";

type ReturnType = [
  /**
   * The default state of the toggle.
   * False when initialized.
   */
  boolean,

  /**
   * A method that toggles the state.
   */
  () => void
];

/**
 * Hook that returns a simple toggler state.
 * @returns {ReturnType}
 */
export default function useToggleState(initialState = false): ReturnType {
  const [isOpen, setIsOpen] = React.useState(initialState);

  return [isOpen, () => setIsOpen(!isOpen)];
}

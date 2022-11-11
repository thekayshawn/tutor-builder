import * as React from "react";

export type IconButtonProps = {
  title?: string;
  hasTooltip?: boolean;
  children: React.ReactElement;
  tooltipPosition?: string;
} & JSX.IntrinsicElements["button"];

/**
 * Generic icon button.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 * @version 0.0.1
 */
export default function IconButton({
  title,
  children,
  className = "",
  hasTooltip = false,
  tooltipPosition = "top",
  ...props
}: IconButtonProps): JSX.Element {
  const finalProps: Record<string, any> = props;

  if (hasTooltip) {
    finalProps["role"] = "tooltip";
    finalProps["aria-label"] = title;
    finalProps["data-microtip-position"] = tooltipPosition;
  }

  return (
    <button
      {...finalProps}
      className={`py-0 px-1 border-1 rounded bg-white text-secondary ${className}`}
    >
      {children}
    </button>
  );
}

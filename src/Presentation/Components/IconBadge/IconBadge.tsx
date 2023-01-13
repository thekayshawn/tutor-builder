import * as React from "react";
import { TablerIcon, TablerIconProps } from "@tabler/icons";

export type IconBadgeProps = {
  title: string;
  icon: TablerIcon;
  iconProps?: TablerIconProps;
} & Omit<React.ComponentPropsWithoutRef<"span">, "title">;

export default function IconBadge({
  title,
  iconProps,
  icon: Icon,
  ...props
}: IconBadgeProps) {
  return (
    <>
      <span className="sr-only">{title}</span>
      <span
        {...props}
        title={title}
        aria-hidden="true"
        style={{
          width: "1.5rem",
          height: "1.5rem",
        }}
      >
        <Icon size={16} {...iconProps} />
      </span>
    </>
  );
}

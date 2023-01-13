import * as React from "react";
import { IconPencil, IconPlus, IconX } from "@tabler/icons";
import { Badge, Button } from "reactstrap";
import IconBadge from "@Presentation/Components/IconBadge/IconBadge";

type Props = {
  /**
   * The HTML ID attribute for the input field.
   */
  id: string;

  /**
   * Additional props for the parent container of the field.
   */
  containerProps?: React.ComponentPropsWithoutRef<"div">;

  /**
   * @param file The selected file
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>, file: File) => void;
} & Omit<React.ComponentPropsWithoutRef<"input">, "id" | "onChange">;

export default function ModalFileInput({
  id,
  value,
  onChange,
  containerProps,
  ...props
}: Props) {
  return (
    <aside
      {...containerProps}
      className={`d-flex flex-column gap-2 ${containerProps?.className}`}
    >
      <label
        htmlFor={id}
        aria-label="Select a thumbnail"
        className="focusable bg-gray-300 w-100 py-5 rounded border-1 position-relative"
      >
        {value ? (
          <>
            <img
              aria-hidden="true"
              src={value as string}
              alt="Selected Thumbnail"
              className="position-absolute top-0 start-0 h-100 w-100 object-contain object-center"
            />
            <span className="sr-only">Change selected thumbnail</span>
            <IconBadge
              icon={IconPencil}
              title="Change selected thumbnail"
              className="bg-success border-0 position-absolute rounded-circle top-0 start-100 translate-middle"
              iconProps={{
                className:
                  "text-white position-absolute top-50 start-50 translate-middle",
              }}
            />
          </>
        ) : (
          <IconPlus className="position-absolute top-50 start-50 translate-middle" />
        )}
      </label>
      <input
        {...props}
        hidden
        id={id}
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];

          if (!selectedFile) return;

          onChange?.(e, selectedFile);
        }}
      />
    </aside>
  );
}

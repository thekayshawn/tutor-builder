import * as React from "react";
import { IconPlus } from "@tabler/icons";

type Props = {
  /**
   * Additional props for the parent container of the field.
   */
  containerProps?: React.ComponentPropsWithoutRef<"div">;

  /**
   * @param file The selected file
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>, file: File) => void;
} & Omit<React.ComponentPropsWithoutRef<"input">, "onChange">;

export default function ModalFileInput({
  id,
  value,
  onChange,
  containerProps,
  ...props
}: Props) {
  const uniqueID = React.useId();
  const finalID = id || `input-${uniqueID}`;

  return (
    <aside
      {...containerProps}
      className={`d-flex flex-column gap-2 ${containerProps?.className}`}
    >
      <div className="card-title">Thumbnail *</div>
      <label
        htmlFor={finalID}
        style={{ backgroundColor: "var(--bs-gray-600)" }}
        className="focusable w-100 p-4 rounded border-1"
      >
        <IconPlus />
      </label>
      {value && (
        <img
          alt=""
          src={value as string}
          className="w-100 p-4 rounded border-1"
        />
      )}
      <input
        hidden
        {...props}
        type="file"
        id={finalID}
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];

          if (!selectedFile) return;

          onChange?.(e, selectedFile);
        }}
      />
    </aside>
  );
}

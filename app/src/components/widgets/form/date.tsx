import React, { useState } from "react";
import { WidgetProps } from "@rjsf/utils";

// Define a custom date-time widget
const DateTimeWidget: React.FC<WidgetProps> = ({
  id,
  value,
  required,
  disabled,
  readonly,
  onBlur,
  onFocus,
  onChange,
  schema,
}) => {
  const [localValue, setLocalValue] = useState<string | undefined>(
    value as string | undefined
  );

  const handleBlur = () => {
    onBlur(id, localValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      type="datetime-local"
      id={id}
      className="form-control"
      value={localValue || ""}
      required={required}
      disabled={disabled || readonly}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={onFocus}
      {...schema?.options?.inputProps}
    />
  );
};

export { DateTimeWidget };

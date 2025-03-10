import React from "react";
import { Select } from "antd";
import { WidgetProps } from "@rjsf/utils";
import { useId } from "@mantine/hooks";

const { Option } = Select;

interface SelectOptions {
  value: string;
  label: string;
}

const SelectFieldWidget: React.FC<WidgetProps> = (props: WidgetProps) => {
  const handleChange = (selectedValue: any) => {
    props.onChange(selectedValue);
  };

  console.log(`props: `, props);

  // Use optional chaining to safely access uiSchema and its properties
  const options: SelectOptions[] = (props?.uiSchema?.["ui:options"]?.options ||
    []) as SelectOptions[];

  return (
    <div style={{ width: "100%" }}>
      <div>
        {props.schema.title}
        {props.schema.required ? "*" : null}
      </div>
      <Select
        id={props.id}
        value={props.value}
        disabled={props.disabled || props.readonly}
        allowClear={!props.required}
        onChange={handleChange}
        showSearch
        optionFilterProp="children" // Enables search by option label
        style={{ width: "100%" }}
        defaultValue={props?.uiSchema?.["ui:options"]?.defaultValue}
      >
        {options?.map((option: SelectOptions, index) => (
          <Option key={useId(index.toString())} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export { SelectFieldWidget };


import React, { useState, useRef } from "react";
import { Select } from "antd";
import axios from "axios";
import { WidgetProps } from "@rjsf/utils";
import { debounce } from "lodash";
import { queryParams } from "../../api";
import { useEffectAsync } from "../../utils/asyncUseEffect";


interface SelectOptions {
  value: string;
  label: string;
}

const { Option } = Select;

const AsyncSelectWidget: React.FC<
  WidgetProps & {
    uiSchema: {
      "ui:options": {
        api: (queryParams?: queryParams | undefined) => string;
        searchKey: string;
        labelKey: string;
        valueKey: string;
      };
    };
  }
> = (props) => {
  const handleChange = (selectedValue: any) => {
    props.onChange(selectedValue);
  };

  const { api, searchKey, labelKey, valueKey } = props.uiSchema["ui:options"];
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<SelectOptions[]>([]);
  const [total, setTotal] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async (
    search: string,
    take: number,
    skip: number
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(api({ take, skip, q: search })); // calling the api
      const data: SelectOptions[] = response.data.results.map((item: any) => ({
        label: item[labelKey], // name example
        value: item[valueKey], // _id example
      }));
      setLoading(false);
      setTotal(response.data.total);
      return data;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const debouncedSearch = debounce(
    async (searchTerm: string, take: number, skip: number) => {
      const data = await fetchData(
        searchTerm,
        take,
        skip
      );
      setOptions(data);
    },
    300 // Adjust the delay as needed (300 milliseconds in this example)
  );

  const handleSearch = (searchTerm: string) => {
    debouncedSearch(searchTerm, 10, 0); // Example: Default 'take' and 'skip' values
  };

  const handleScroll = async () => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const { scrollTop, clientHeight, scrollHeight } = scrollElement;
      if (scrollTop + clientHeight === scrollHeight && options.length < total) {
        const newTake = options.length + 3; // Adjust as needed
        const newData = await fetchData("", newTake, 0);
        setOptions((prevOptions) => [...prevOptions, ...newData]);
      }
    }
  };

  useEffectAsync(async () => {
    let defaultData: SelectOptions[] = [];
    if (props.formData) {
      const data = await fetchData(
        props.formData,
        10, // Example: Default 'take' value
        0 // Example: Default 'skip' value
      );
      defaultData = data;
    }
    const data = await fetchData("", 3, 0); // Example: Default 'take' and 'skip' values
    setOptions([...data, ...defaultData]);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div>
        {props.schema.title}
        {props.schema.required ? "*" : null}
      </div>
      <Select
        loading={loading}
        id={props.id}
        value={props.value}
        disabled={props.disabled || props.readonly}
        allowClear={!props.required}
        onChange={handleChange}
        onSearch={handleSearch}
        showSearch
        optionFilterProp="children" // Enables search by option label
        style={{ width: "100%" }}
        defaultValue={props.formData}
        onPopupScroll={handleScroll}
        ref={scrollRef}
      >
        {options?.map((option: SelectOptions, index) => (
          <Option key={index.toString()} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export { AsyncSelectWidget };

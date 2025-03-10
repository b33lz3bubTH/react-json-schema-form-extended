const PropertyType = ["Other", "Rent", "Sell", "Plot"];

export const PropertyTypeOptions = PropertyType.map((data: string) => {
  return {
    label: data,
    value: data,
  };
});

const ConstructionStatus = ["UnderConstruction", "Completion", "Paused"];

export const ConstructionStatusOptions = ConstructionStatus.map(
  (data: string) => {
    return {
      label: data,
      value: data,
    };
  }
);

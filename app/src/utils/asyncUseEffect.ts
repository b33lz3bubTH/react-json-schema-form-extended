
import { useEffect } from "react";

export function useEffectAsync(effect: () => void, inputs: Array<any>) {
  useEffect(() => {
    effect();
  }, inputs);
}

import React, { useCallback, useEffect } from "react";

export function useDebouncedEffect(
  effect: () => void,
  delay: number,
  deps: React.DependencyList
) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
}

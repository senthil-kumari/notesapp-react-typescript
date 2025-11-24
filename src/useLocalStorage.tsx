import { useEffect, useRef, useState } from "react";

type Options = {
  onError?: (error: Error | DOMException, key: string) => void;
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options?: Options
) {
  const { onError } = options || {};
  const errorHandled = useRef(false);
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      if (
        !errorHandled.current &&
        (err instanceof Error || err instanceof DOMException)
      ) {
        errorHandled.current = true;
        onError?.(err, key);
      }
    }
  }, [value, key, onError]);

  return [value, setValue] as [T, typeof setValue];
}

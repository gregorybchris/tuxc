import { useEffect, useState } from "react";
import { Optional } from "../utilities/type-utils";

export function useStorage(key: string) {
  const [value, setValue] = useState<Optional<string>>();

  useEffect(() => {
    load();
  }, []);

  function load(): Optional<string> {
    const storageValue = window.localStorage.getItem(key) || undefined;
    setValue(storageValue);
    return storageValue;
  }

  function save(value: Optional<string> = undefined) {
    if (value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
      setValue(value);
    }
  }

  return [value, save, load] as const;
}

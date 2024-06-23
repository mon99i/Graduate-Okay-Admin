import { useState, ChangeEvent } from "react";

interface InputHook {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * useInput hooks
 * @param initialValue - 입력받는 문자열
 */
const useInput = (initialValue: string): InputHook => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default useInput;

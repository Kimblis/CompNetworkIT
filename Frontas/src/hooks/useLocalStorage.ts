import { useState } from 'react';

function useLocalStorage(key: string, initialValue: null) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const item = window.localStorage.getItem(key);
    try {
      // Get from local storage by key
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return item || initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: string | null) => {
    try {
      // Save state
      setStoredValue(value);
      // Save to local storage
      window.localStorage.setItem(key, value as unknown as string);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

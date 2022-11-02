export const isValidUpdate = (presentValues, updatedValues) => {
  if (!updatedValues || !presentValues) {
    return false;
  }

  return !!Object.keys(updatedValues).reduce((acc, key) => {
    if (updatedValues[key] === undefined) {
      delete updatedValues[key];
    }
    if (presentValues[key] !== updatedValues[key]) {
      acc.push(key);
    }
    return acc;
  }, []).length;
};

export const debounce = <T extends (...args: any[]) => void>(
  callback: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | undefined;

  const debouncedFn = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };

  return debouncedFn;
};

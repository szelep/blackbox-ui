import { useEffect } from 'react';

/**
 * Simple time interval hook that invokes callback on every 1000ms.
 *
 * @param {Function} callback - callback function
 * @param {Array} deps - if present, effect will only activate if the values in the list change.
 */
export function useInterval(callback, deps = []) {
  useEffect(() => {
    const timer = setInterval(() => {
      callback();
    }, 1000);

    return () => clearInterval(timer);
  }, [deps]);
}

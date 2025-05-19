import { useRef, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

export function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const debouncedFn = useRef(
    debounce((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delay)
  );

  useEffect(() => {
    return () => {
      debouncedFn.current.cancel();
    };
  }, []);

  return useCallback((...args: Parameters<T>) => {
    debouncedFn.current(...args);
  }, []);
} 
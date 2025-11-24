/**
 * Custom Hook: useFetch
 *
 * A reusable hook for fetching data from APIs with loading and error states.
 */

import { useState, useEffect } from "react";
import type { ApiError } from "../types";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
}

/**
 * Custom hook for fetching data
 *
 * @param url - URL to fetch data from
 * @param options - Fetch options
 * @returns Object containing data, loading state, error, and refetch function
 *
 * @example
 * const { data, loading, error } = useFetch<User[]>('https://api.example.com/users');
 */
export function useFetch<T>(
  url: string,
  options?: RequestInit
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw {
            message: `HTTP error! status: ${response.status}`,
            status: response.status,
          };
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError({
            message: err.message || "An error occurred while fetching data",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to abort fetch on unmount
    return () => {
      controller.abort();
    };
  }, [url, refetchTrigger, options]);

  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  return { data, loading, error, refetch };
}





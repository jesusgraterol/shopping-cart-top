import { useState, useEffect, useCallback } from 'react';

/**
 * API Request Hook
 * Hook in charge of handing interactions with external APIs. It takes a function and an optional list 
 * of arguments that will be used to call the function with.
 */
function useAPIRequest(requestFunction, args = undefined) {
  const [ data, setData ] = useState(undefined);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const buildRequestFunction = useCallback(
    () => args === undefined ? requestFunction() : requestFunction(...args),
    [requestFunction, args]
  );

  useEffect(() => {
    let ignore = false;

    const executeRequest = async () => {
      try {
        const data = await buildRequestFunction();
        setError(null);
        if (!ignore) {
          setData(data);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    executeRequest();

    return () => { ignore = true };
  }, [ buildRequestFunction ]);


  return { data, loading, error };
}

/**
 * Module Exports
 */
export default useAPIRequest;
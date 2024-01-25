import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Active Route Hook
 * This custom hook keeps track of the active route on navigation.
 */
function useActiveRoute() {
  const [ activeRoute, setActiveRoute ] = useState('');
  const location = useLocation();

  useEffect(() => {
      setActiveRoute(location.pathname.split('/').at(-1));
  }, [ location ]);

  return activeRoute;
}

/**
 * Module Exports
 */
export default useActiveRoute;
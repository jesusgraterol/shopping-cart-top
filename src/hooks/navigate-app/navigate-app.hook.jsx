import { useNavigate } from 'react-router-dom';

// the app's base path
const BASE_PATH = '/shopping-cart-top';

/**
 * Navigate App Hook
 * When hosting apps on Github, it is necessary to configure a base path so assets can be properly
 * loaded. This hook wraps the useNavigate hook so the navigation logic does not have to be 
 * duplicated.
 */
function useNavigateApp() {
  const navigate =  useNavigate();

  function navigateApp(path) {
    navigate(`${BASE_PATH}/${path}`)
  }

  return navigateApp;
}

/**
 * Module Exports
 */
export default useNavigateApp;
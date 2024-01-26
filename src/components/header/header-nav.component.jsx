import { useState, useEffect, useContext } from 'react';
import useActiveRoute from '../../hooks/active-route/active-route.hook';
import useNavigateApp from '../../hooks/navigate-app/navigate-app.hook';
import { CartContext } from '../../context/cart/cart.context';
import Sidenav from './sidenav.component';

/**
 * Header Nav
 * ...
 */
function HeaderNav() { 
  const navigate =  useNavigateApp();
  const activeRoute = useActiveRoute();
  const [ sidenavVisible, setSidenavVisible ] = useState(false);
  const { prettyTotalQuantity } = useContext(CartContext);


  // ensure the sidenav is closed whenever the route changes
  useEffect(() => {
      setSidenavVisible(false);
  }, [ activeRoute ]);



  // event handler to toggle the sidenav visibility status
  const toggleSidenavVisibility = () => setSidenavVisible(!sidenavVisible);



  // event handler to open the app's repo on a new browser tab
  const handleSourceCodeClick = () => {
    window.open(
      'https://github.com/jesusgraterol/shopping-cart-top', 
      '_blank', 
      'noopener noreferrer'
    );
  }



  return (
    <>
      <nav>

        {/* Desktop Navigation */}
        <button className="btn primary" 
                onClick={() => navigate('')} 
                disabled={activeRoute === ''}>
          <span className="md-icon" aria-hidden="true">home</span>
          Home
        </button>
        <button className="btn primary" 
                onClick={() => navigate('products')} 
                disabled={activeRoute === 'products'}>
          <span className="md-icon" aria-hidden="true">grid_view</span>
          Products
        </button>
        <button className="btn primary" 
                onClick={() => navigate('cart')} 
                disabled={activeRoute === 'cart'}>
          <span className="button-badge">{prettyTotalQuantity}</span>
          <span className="md-icon" aria-hidden="true">shopping_cart</span>
          Cart
        </button>
        <button className="btn primary" onClick={handleSourceCodeClick}>
          <span className="md-icon" aria-hidden="true">code</span>
          Source Code
        </button>

        {/* Mobile Navigation */}
        <button className="icon-btn primary" 
                onClick={toggleSidenavVisibility} 
                aria-label="Toggle Side Navigation">
          <span className="md-icon" aria-hidden="true">menu</span>
        </button>

      </nav>

      {/* Mobile Sidenav */}
      {sidenavVisible && (
        <Sidenav  activeRoute={activeRoute} 
                  toggleSidenavVisibility={toggleSidenavVisibility} 
                  handleSourceCodeClick={handleSourceCodeClick} />
      )}

    </>
  );
}




/**
 * Module Exports
 */
export default HeaderNav;
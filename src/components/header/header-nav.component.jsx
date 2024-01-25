import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidenav from './sidenav.component';

/**
 * Header Nav
 * ...
 */
function HeaderNav() { 
  const navigate =  useNavigate();
  const [ sidenavVisible, setSidenavVisible ] = useState(false);



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
        <button className="btn primary" onClick={() => navigate('/shopping-cart-top/')}>
          <span className="md-icon" aria-hidden="true">home</span>
          Home
        </button>
        <button className="btn primary" onClick={() => navigate('/shopping-cart-top/products')}>
          <span className="md-icon" aria-hidden="true">grid_view</span>
          Products
        </button>
        <button className="btn primary" onClick={() => navigate('/shopping-cart-top/cart')}>
          <span className="button-badge">0</span>
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

      <Sidenav  sidenavVisible={sidenavVisible} 
                toggleSidenavVisibility={toggleSidenavVisibility}
                handleSourceCodeClick={handleSourceCodeClick} />
    </>
  );
}




/**
 * Module Exports
 */
export default HeaderNav;
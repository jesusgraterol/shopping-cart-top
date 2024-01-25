import { useState } from 'react';
import Sidenav from './sidenav.component';

/**
 * Header Nav
 * ...
 */
function HeaderNav() { 
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
        <button className="btn primary">
          <span className="md-icon" aria-hidden="true">home</span>
          Home
        </button>
        <button className="btn primary">
          <span className="md-icon" aria-hidden="true">grid_view</span>
          Products
        </button>
        <button className="btn primary">
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
import PropTypes from 'prop-types';
import useNavigateApp from '../../hooks/navigate-app/navigate-app.hook';


/**
 * Sidenav Component
 * ...
 */
function Sidenav({ activeRoute, toggleSidenavVisibility, handleSourceCodeClick }) {
  const navigate =  useNavigateApp();


  return (
    <div className="sidenav-container">
      <section>
        
        <header>

          <h2>Menu</h2>

          <span className="flex-separator"></span> 
          
          <button className="icon-btn" onClick={toggleSidenavVisibility}>
            <span className="md-icon">close</span>
          </button>
          
        </header>

        <ul>
          <li>
            <button className="btn" 
                    onClick={() => navigate('')} 
                    disabled={activeRoute === ''}>
              <span className="md-icon" aria-hidden="true">home</span>
              Home
            </button>
          </li>
          <li>
            <button className="btn" 
                    onClick={() => navigate('products')} 
                    disabled={activeRoute === 'products'}>
              <span className="md-icon" aria-hidden="true">grid_view</span>
              Products
            </button>
          </li>
          <li>
            <button className="btn"
                    onClick={() => navigate('cart')} 
                    disabled={activeRoute === 'cart'}>
              <span className="md-icon" aria-hidden="true">shopping_cart</span>
              Cart
              <span className='flex-separator'></span>
              <span className="button-badge">0</span>
            </button>
          </li>
          <li>
            <button className="btn" onClick={handleSourceCodeClick}>
              <span className="md-icon" aria-hidden="true">code</span>
              Source Code
            </button>
          </li>
        </ul>

      </section>
    </div>
  );
}
Sidenav.propTypes = {
  activeRoute: PropTypes.string.isRequired,
  toggleSidenavVisibility: PropTypes.func.isRequired,
  handleSourceCodeClick: PropTypes.func.isRequired,
}



/**
 * Module Exports
 */
export default Sidenav;
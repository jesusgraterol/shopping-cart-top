import HeaderNav from './header-nav.component';

/**
 * Header Component
 * ...
 */
function Header() {



  return (
    <header>

      <img src="logo/logo-white.png" alt="Logo" />

      <span className="flex-separator"></span>

      <HeaderNav />

    </header>
  );
}




/**
 * Module Exports
 */
export default Header;
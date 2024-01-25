import useNavigateApp from '../../hooks/navigate-app/navigate-app.hook';

/**
 * Home Component
 * ...
 */
function Home() {
  const navigate =  useNavigateApp();

  return (
    <div id="homeContainer">

      <div className="splash-container">

        <div className="inner">

          <h1>High Quality Products</h1>

          <h2>Competitive Prices</h2>

          <p>New styles every week. Free shipping on all orders.</p>

          <button className="btn primary" onClick={() => navigate('products')}>SHOP NOW</button>

        </div>
      </div>

    </div>
  );
}




/**
 * Module Exports
 */
export default Home;
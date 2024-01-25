import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app.component';
import Home from './home/home.component';
import Products from './products/products.component';
import ProductDetails from './products/product-details.component';
import Cart from './cart/cart.component';
import NotFound from './not-found/not-found.component';

/**
 * Router Component
 * ...
 */
function Router() {
  const router = createBrowserRouter([
    {
      path: '/shopping-cart-top/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'products', element: <Products /> },
        { path: 'productDetails/:id', element: <ProductDetails /> },
        { path: 'cart', element: <Cart /> },
      ],
      errorElement: <NotFound />,
    }
  ]);

  return <RouterProvider router={router} />;
}




/**
 * Module Exports
 */
export default Router;
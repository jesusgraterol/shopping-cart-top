
import { Outlet } from 'react-router-dom';
import Header from './header/header.component';

function App() {

  return (
    <div id="appContainer">
      <Header />

      <main>

        <Outlet />
        
      </main>

    </div>
  )
}

export default App;

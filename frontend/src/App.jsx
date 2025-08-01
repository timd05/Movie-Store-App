import './css/App.css';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CheckOut from './pages/CheckOut';
import { Routes, Route } from 'react-router-dom';
import {MovieProvider} from './contexts/MovieContext';
import {ShopProvider} from './contexts/ShopContext';

function App() {

  return (
    <MovieProvider>
      <ShopProvider>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/checkOut" element={<CheckOut />} />
            </Routes>
          </main>
        </ShopProvider>
    </MovieProvider>
  );
}


export default App

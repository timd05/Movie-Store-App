import "../css/Navbar.css";
import { Link } from 'react-router-dom';
import { useMovieContext } from "../contexts/MovieContext";
import { useShopContext } from "../contexts/ShopContext";

function NavBar() {
    const { favorites } = useMovieContext();
    const { shopItems } = useShopContext();
    return <nav className="navbar">
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="navFav-link">Favorites</Link><p className="counter">{favorites.length}</p>
            <Link to="/shop" className="navFav-link">Shop</Link><p className="counter">{shopItems.length}</p>
        </div>

    </nav>
}

export default NavBar;
import { useShopContext } from "../contexts/ShopContext";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/NavBar";
import "../css/Favorites.css";
import "../css/Shop.css";
import { Link } from 'react-router-dom';

function Shop() {
    const { shopItems } = useShopContext();
    
    if (shopItems && shopItems.length > 0) {
        return (
            <>
                <div className="shop-header">
                    <Navbar />
                    <Link to="/checkOut" className="nav-link check-out-btn">Check Out</Link>
                </div>
                <div className="favorites">
                    <h2>Your Shopping-Cart</h2>
                    <hr className="line"></hr>
                    <div className="moviesShop-grid">
                        {shopItems.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                </div>
            </>
        );
    } else {
        return (
        <>
            <Navbar />
            <div className="favorites-empty">
                <h2>No movies added yet</h2>
                <p>Start adding movies to your shopping cart!</p>
            </div>
        </>
    );
    }
}

export default Shop;
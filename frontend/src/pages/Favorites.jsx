import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/NavBar";


function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites && favorites.length > 0) {
        return (
            <>
                <Navbar />
                <div className="favorites">
                    <h2 className="favorite-title">Your Favorites</h2>
                    <hr className="line"></hr>
                    <div className="moviesFav-grid">
                        {favorites.map((movie) => (
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
                    <h2>No favorites added yet</h2>
                    <p>Start adding movies to your favorites list!</p>
                </div>
            </>
        );
    }
}

export default Favorites;
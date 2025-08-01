import MovieCard from "../components/MovieCard";
import Navbar from "../components/NavBar";
import {useState, useEffect} from "react";
import {searchMovies, getPopularMovies} from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch popular movies.");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    },[]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            const loadPopularMovies = async () => {
                try {
                    const popularMovies = await getPopularMovies();
                    setMovies(popularMovies);
                } catch (err) {
                    console.log(err);
                    setError("Failed to fetch popular movies.");
                } finally {
                    setLoading(false);
                }
            };
            loadPopularMovies();
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err){
            console.log(err);
            setError("Failed to fetch search results.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <div className="home-nav">
                <Navbar />
                <form onSubmit={handleSearch} className="search-form">
                    <input type="text" className="search-input" placeholder="Search for movies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
            {error && <div className="error-message">{error}</div>}
            {loading ? (<div className="loading">Loading...</div>) : (
            <div className="movies-grid">
                {movies.map((movie)=>
                    (<MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>)}
        </div>
    );
}

export default Home;
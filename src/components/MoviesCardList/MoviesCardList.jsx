import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
    return(
        <main className = "movies-card-list">
            <MovieCard></MovieCard>
            <MovieCard></MovieCard>
            <MovieCard></MovieCard>
            <MovieCard></MovieCard>
            <MovieCard></MovieCard>
            <MovieCard></MovieCard>
        </main>
    );
}
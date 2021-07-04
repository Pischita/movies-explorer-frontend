import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ movies, enableDelete, onMovieSave }) {
  return (
    <main className='movies-card-list'>
      {movies.map((movie) => (
        <MovieCard
          key={movie.movieId}
          name={movie.nameRU}
          movieId={movie.movieId}
          duration={movie.duration}
          saved={movie.saved}
          enableDelete={enableDelete}
          image={movie.image}
          onMovieSave={onMovieSave}
        ></MovieCard>
      ))}
    </main>
  );
}

import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ movies, enableDelete }) {
  return (
    <main className='movies-card-list'>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          name={movie.nameRU}
          duration={movie.duration}
          saved={true}
          enableDelete={enableDelete}
          image={movie.image}
        ></MovieCard>
      ))}
    </main>
  );
}

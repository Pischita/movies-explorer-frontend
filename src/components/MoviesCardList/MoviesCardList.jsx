import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList({ movies, enableDelete, onMovieSave, showPreloader }) {
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
          trailer={movie.trailer}
        ></MovieCard>
      ))}
      { showPreloader && <Preloader/> }
    </main>
  );
}

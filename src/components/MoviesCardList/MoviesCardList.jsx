import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({enableDelete}) {
    return(
        <main className = "movies-card-list">
            <MovieCard name="33 слова о дизайне" duration="1ч22м" saved={true} enableDelete={enableDelete}></MovieCard>
            <MovieCard name="33 слова о дизайне" duration="1ч22м" enableDelete={enableDelete}></MovieCard>
            <MovieCard name="33 слова о дизайне" duration="1ч22м" saved={true} enableDelete={enableDelete}></MovieCard>
            <MovieCard name="33 слова о дизайне" duration="1ч22м" enableDelete={enableDelete}></MovieCard>
            <MovieCard name="33 слова о дизайне" duration="1ч22м" saved={true} enableDelete={enableDelete}></MovieCard>
            <MovieCard name="33 слова о дизайне" duration="1ч22м" enableDelete={enableDelete}></MovieCard>
        </main>
    );
}
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
    return(
        <main className = "movies-card-list">
            <MovieCard name="33 слова о дизайне" duration="1ч22м" saved={true}></MovieCard>
            <MovieCard name="33 слова о дизайне" duration="1ч22м"></MovieCard>
            <MovieCard name="33 слова о дизайне" duration="1ч22м" saved={true}></MovieCard>
            <MovieCard name="33 слова о дизайне" duration="1ч22м"></MovieCard>
            <MovieCard name="33 слова о дизайне" duration="1ч22м" saved={true}></MovieCard>
            <MovieCard name="33 слова о дизайне" duration="1ч22м"></MovieCard>
        </main>
    );
}
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies() {
    return (
        <div className="movies">
            <Header></Header>
            <SearchForm></SearchForm>
            <MoviesCardList></MoviesCardList>
        </div>
        
    );
}
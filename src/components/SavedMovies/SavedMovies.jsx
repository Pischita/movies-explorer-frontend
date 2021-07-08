import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import Footer from '../Footer/Footer';

export default function SavedMovies({movies, onMovieSave, searchString, onChangeSearchString, isShortFilms, onChangeShortFilms, onClickSearchForm}) {
    return (
        <div className="saved-movies">
            <Header></Header>
            <SearchForm searchString={searchString} onChangeSearchString={onChangeSearchString} isShortFilms={isShortFilms} onClickSearchForm={onClickSearchForm} onMovieSave={onMovieSave}></SearchForm>
            <MoviesCardList movies={movies} enableDelete={true} onMovieSave={onMovieSave}></MoviesCardList>
            <div className="saved-movies__empty-block"></div>
            <Footer></Footer>
        </div>
    );
}
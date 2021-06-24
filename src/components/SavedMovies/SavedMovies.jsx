import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

export default function SavedMovies() {
    return (
        <div className="saved-movies">
            <Header></Header>
            <SearchForm></SearchForm>
            <MoviesCardList></MoviesCardList>
            <div className="saved-movies__empty-block"></div>
            <Footer></Footer>
            {/* <Preloader></Preloader> */}
        </div>
    );
}
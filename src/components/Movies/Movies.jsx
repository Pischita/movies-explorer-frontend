import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import DownloadMore from '../DownloadMore/DownloadMore';
import Footer from '../Footer/Footer';


export default function Movies({movies, searchString, onChangeSearchString, onMovieSave, showPreloader, isShortFilms, onChangeShortFilms}) {
    return (
        <div className="movies">
            <Header></Header>
            <SearchForm searchString={searchString} onChangeSearchString={onChangeSearchString} isShortFilms={isShortFilms} onChangeShortFilms={onChangeShortFilms}></SearchForm>
            <MoviesCardList movies={movies} onMovieSave={onMovieSave} showPreloader={showPreloader}></MoviesCardList>
            <DownloadMore></DownloadMore>
            <Footer></Footer>
            {/* <Preloader></Preloader> */}
        </div>
        
    );
}
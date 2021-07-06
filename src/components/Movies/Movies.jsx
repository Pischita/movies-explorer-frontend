import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import DownloadMore from '../DownloadMore/DownloadMore';
import Footer from '../Footer/Footer';


export default function Movies() {
    return (
        <div className="movies">
            <Header></Header>
            <SearchForm></SearchForm>
            <MoviesCardList></MoviesCardList>
            <DownloadMore></DownloadMore>
            <Footer></Footer>
            {/* <Preloader></Preloader> */}
        </div>
        
    );
}
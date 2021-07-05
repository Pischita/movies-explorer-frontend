import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import DownloadMore from '../DownloadMore/DownloadMore';
import Footer from '../Footer/Footer';
import { useState, useEffect } from 'react';

import useWindowSize from '../../hooks/useWindowSize';

// Hook


export default function Movies({movies, searchString, onChangeSearchString, onMovieSave, showPreloader, isShortFilms, onChangeShortFilms}) {
    const size = useWindowSize();

    const [showedMovies, setShowedMovies] = useState([]);
    const [showDownloadMore, setShowDownloadMore] = useState(false);

    function handleShowNext(){
        console.log('Вывести следующие');
        let feedLength = 0
        if(size.width >= 1280 ){
            feedLength = 3
        } else {
            feedLength = 2
        }

        showMovies(feedLength);
    }

    function showMovies(size){
        
        let lengthShovedMovies = showedMovies.length
        const arr = [];
        for(let i= lengthShovedMovies; i < Math.min(lengthShovedMovies + size, movies.length); i++){
            arr.push(movies[i]);
        }
        
        setShowedMovies((prevState) =>{ return [...prevState, ...arr]});
    }
    
   

    useEffect(() =>{
        setShowedMovies([]);

        let feedLength = 0
        if(size.width > 1280 ){
            feedLength = 12
        } else if(size.width >= 768) {
            feedLength = 8
        } else {
            feedLength = 5;
        }
        showMovies(feedLength);
    }, [movies]);

    useEffect(()=>{
        setShowDownloadMore(movies.length !== showedMovies.length);
    },[movies, showedMovies])
    
    return (
        <div className="movies">
            <Header></Header>
            <SearchForm searchString={searchString} onChangeSearchString={onChangeSearchString} isShortFilms={isShortFilms} onChangeShortFilms={onChangeShortFilms}></SearchForm>
            {searchString.length > 0 && <MoviesCardList movies={showedMovies} onMovieSave={onMovieSave} showPreloader={showPreloader}></MoviesCardList>}
            {showDownloadMore && <DownloadMore onDownloadMore={handleShowNext}></DownloadMore>}            
            <Footer></Footer>
            {/* <Preloader></Preloader> */}
        </div>
        
    );
}
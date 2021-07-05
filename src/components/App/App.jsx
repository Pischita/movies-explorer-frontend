import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';


function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [showPreloader, setShowPreloader] = useState('false');
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: '',
  });

  useEffect(() => {
    moviesApi.getFilms()
      .then((data) => {
        const movies = data.map((item) => {
          return {
            nameRU: item.nameRU,
            nameEN: item.nameEN,
            movieId: item.id,
            thumbnail:
              'https://api.nomoreparties.co' + item.image.formats.thumbnail.url,
            trailer: item.trailerLink,
            image: 'https://api.nomoreparties.co' + item.image.url,
            description: item.description,
            year: item.year,
            duration: item.duration,
            director: item.director,
            country: item.country,
            saved: false,
          };
        });
        setMovies(movies);
        setFilteredMovies(movies);
      }).catch(err =>{
        console.log(err);
      });
  }, []);

  function fillFavoriteMovies() {
    mainApi
      .getSavedFilms()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {

    setShowPreloader(true);

    const arr = movies.filter((item) => {
      return item.nameRU.toLowerCase().includes(searchString.toLowerCase() ) && (isShortFilms ? item.duration <= 40 : true) ;
    });

    arr.forEach(item => {
      const findedSavedMovie = savedMovies.find((savedItem) => savedItem.movieId === item.movieId);
      if(findedSavedMovie){
        item.saved = true;
      }else{
        item.saved = false;
      }      
    });

    setFilteredMovies(arr);

    // Фильтрация по сохраненным фильмам
    const arrSaved = savedMovies.filter((item) => {
      return item.nameRU.toLowerCase().includes(searchString.toLowerCase() ) && (isShortFilms ? item.duration <= 40 : true) ;
    });
    setFilteredSavedMovies(arrSaved);


    setShowPreloader(false);
  }, [searchString, movies, savedMovies, isShortFilms]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleChangeSearchString(evt) {
    setSearchString(evt.target.value);
  }

  function handelChangeIsShortFilms(state){
    setIsShortFilms(state);
    console.log(state);
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((data) => {
          setCurrentUser({
            name: data.name,
            email: data.email,
            _id: data._id,
          });
          setLoggedIn(true);
          fillFavoriteMovies();
        })
        .catch((err) => {
          console.log('Очищен jwt, т.к. не валидный');
          localStorage.removeItem('jwt');
          setLoggedIn(false);
          history.push('/signin');
        });
    }
  }

  function handleLogin() {
    handleTokenCheck();
  }

  function handleMovieSave(movieId, saved) {
    if (saved) {
      const movie = savedMovies.find((item) => item.movieId === movieId);
      mainApi.deleteFilm(movie._id)
        .then(data =>{
          const arr = savedMovies.filter(item =>{ return item._id !== data._id});
          setSavedMovies(arr);
      });
    } else {
      const movie = filteredMovies.find((item) => item.movieId === movieId);
      

      mainApi.saveFilm(movie)
      .then(data =>{
        const arr = [...savedMovies, data];
        setSavedMovies(arr);
        
        movie.saved = true; 
        setFilteredMovies(filteredMovies);    
      });
    }    
  }

  function handleProfileEdit(name, email){
    mainApi.editProfile(name, email)
    .then(data => {
      setCurrentUser({
        name: data.user.name,
        email: data.user.email,
        _id: data.user._id,
      });
    })
    .catch(err =>{
      console.log(err);
    })
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path='/'>
            <div className='promo'>
              <Header></Header>
              <div className='promo__banner'>
                <h1 className='promo__title'>
                  Учебный проект студента факультета Веб-разработки.
                </h1>
              </div>
            </div>
            <NavTab></NavTab>
            <main>
              <AboutProject></AboutProject>
              <Techs></Techs>
              <AboutMe></AboutMe>
            </main>
            <div className='promo__footer'>
              <Footer></Footer>
            </div>
          </Route>
          <Route path='/movies'>
            <ProtectedRoute
              component={Movies}
              loggedIn={loggedIn}
              movies={filteredMovies}
              showPreloader={showPreloader}
              onChangeSearchString={handleChangeSearchString}
              searchString={searchString}
              isShortFilms={isShortFilms}
              onChangeShortFilms={handelChangeIsShortFilms}
              onMovieSave={handleMovieSave}
              enableDelete={false}
            ></ProtectedRoute>
          </Route>
          <Route path='/saved-movies'>
            <ProtectedRoute
              component={SavedMovies}
              searchString={searchString}
              onChangeSearchString={handleChangeSearchString}
              isShortFilms={isShortFilms}
              onChangeShortFilms={handelChangeIsShortFilms}
              loggedIn={loggedIn}
              enableDelete={true}
              movies={filteredSavedMovies}
              showPreloader={showPreloader}
              onMovieSave={handleMovieSave}
            ></ProtectedRoute>
          </Route>
          <Route path='/profile'>
            <ProtectedRoute
              component={Profile}
              loggedIn={loggedIn}
              onEditProfile={handleProfileEdit}>
            </ProtectedRoute>
          </Route>
          <Route path='/signin'>
            <Login onSubmit={handleLogin}></Login>
          </Route>
          <Route path='/signup'>
            <Register></Register>
          </Route>

          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

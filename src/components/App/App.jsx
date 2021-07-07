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
  const [widthScreen, setWidthScreen] = useState(0);
  const [showCard, setShowCard] = useState({start: 0, more: 0});
  const [countCardsOnPage, setCountCardsOnPage] = useState(showCard.start);
  const [enableDownloadMore, setEnableDownloadMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: '',
  });

  useEffect(() => {
    setErrorMessage('');
    moviesApi
      .getFilms()
      .then((data) => {
        const movies = data.map((item) => {
          return {
            nameRU: item.nameRU || '',
            nameEN: item.nameEN || item.nameRU,
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
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  }, []);

  useEffect(()=>{
    setCountCardsOnPage(showCard.start);
  }, [searchString])


  useEffect(() => {
    function handleResize() {
      setWidthScreen(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  useEffect(()=>{
    if(widthScreen > 1280) {
      setShowCard({start: 12, more: 4});
    } else if (widthScreen >= 768){
      setShowCard({start: 8, more: 2});
    } else {
      setShowCard({start: 5, more: 2});
    }
  }, [widthScreen]);

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

    let arr = [];

    if (searchString !== '') {
      arr = movies.filter((item) => {
        let result = item.nameRU.trim().toLowerCase().includes(searchString.toLowerCase()) && (isShortFilms ? item.duration <= 40 : true) ;
        return result;
      });
    }

    arr.forEach((item) => {
      const findedSavedMovie = savedMovies.find(
        (savedItem) => savedItem.movieId === item.movieId
      );
      if (findedSavedMovie) {
        item.saved = true;
      } else {
        item.saved = false;
      }
    });


    setEnableDownloadMore(arr.length > countCardsOnPage);
    setFilteredMovies([...arr.splice(0, countCardsOnPage)]);

    // Фильтрация по сохраненным фильмам
    const arrSaved = savedMovies.filter((item) => {
      return (
        item.nameRU.toLowerCase().includes(searchString.toLowerCase()) &&
        (isShortFilms ? item.duration <= 40 : true)
      );
    });
    setFilteredSavedMovies(arrSaved);

     setShowPreloader(false);
  }, [searchString, movies, savedMovies, isShortFilms, countCardsOnPage]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleChangeSearchString(evt) {
    setSearchString(evt.target.value);
  }

  function handelChangeIsShortFilms(state) {
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
          showErrorMessage(err);
          localStorage.removeItem('jwt');
          setLoggedIn(false);
          history.push('/signin');
        });
    }
  }

  useState(()=>{
    if(loggedIn){
      history.push('/movies');
    }
  },[loggedIn]);

  function handleLogin(email, password) {
    
    mainApi.login(email, password).then((data) =>{
      console.log(data);
      if(data.jwt){
          localStorage.setItem('jwt', data.jwt);
          handleTokenCheck();;
          history.push('/movies');
      }
    }).catch(err =>{
      showErrorMessage('Неправильный логин или пароль');
    });
    
  }

  function handleDownloadMore(){
    setCountCardsOnPage((prevState)=>{
      return prevState += showCard.more;
    });
  }

  function handleMovieSave(movieId, saved) {
    if (saved) {
      const movie = savedMovies.find((item) => item.movieId === movieId);
      mainApi.deleteFilm(movie._id).then((data) => {
        const arr = savedMovies.filter((item) => {
          return item._id !== data._id;
        });
        setSavedMovies(arr);
      });
    } else {
      const movie = filteredMovies.find((item) => item.movieId === movieId);

      mainApi.saveFilm(movie).then((data) => {
        const arr = [...savedMovies, data];
        setSavedMovies(arr);

        movie.saved = true;
        setFilteredMovies(filteredMovies);
      });
    }
  }

  function showSuccessMessage(message){
    setSuccessMessage(message);

    setTimeout( ()=>{
      setSuccessMessage('');
    } , 3000);
  }

  function showErrorMessage(message){
    setErrorMessage(message);

    setTimeout( ()=>{
      setErrorMessage('');
    } , 3000);
  }

  function handleProfileEdit(name, email) {
    mainApi
      .editProfile(name, email)
      .then((data) => {
        setCurrentUser({
          name: data.user.name,
          email: data.user.email,
          _id: data.user._id,
        });

        showSuccessMessage('Изменения сохранены');
      })
      .catch((err) => {
        showErrorMessage(err);
      });
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
              enableDownloadMore={enableDownloadMore}
              onClickDownloadMore={handleDownloadMore}
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
              onEditProfile={handleProfileEdit}
              errorMessage={errorMessage}
              successMessage={successMessage}
            ></ProtectedRoute>
          </Route>
          <Route path='/signin'>
            <Login onSubmit={handleLogin} errorMessage={errorMessage}></Login>
          </Route>
          <Route path='/signup'>
            <Register onSubmit={handleLogin}></Register>
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

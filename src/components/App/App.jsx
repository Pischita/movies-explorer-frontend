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

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([])
  const [searchString, setSearchString] = useState('');
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: '',
  });

  useEffect(() => {
    fetch('https://api.nomoreparties.co/beatfilm-movies')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .then((data) => {
        const movies = data.map((item) => {
          return {
            id: item.id,
            nameRU: item.nameRU,
            nameEN: item.nameEN,
            movieId: item.id,
            thumbnail: '',
            trailer: '',
            image: 'https://api.nomoreparties.co' + item.image.url,
            description: item.description,
            year: item.year,
            duration: item.duration,
            director: item.director,
            country: item.country,
          };
        });
        setMovies(movies);
        setFilteredMovies(movies);
      });
  }, []);

  
  useEffect(()=>{
    const arr = movies.filter(item =>{
      return item.nameRU.toLowerCase().includes(searchString.toLowerCase() );
    });
    setFilteredMovies( arr );
  }, [searchString, movies])

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleChangeSearchString(evt) {
    console.log(evt.target.value);
    setSearchString(evt.target.value);
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((data) => {
          setCurrentUser({
            name:data.name, 
            email: data.email,
            _id: data._id
          });
          setLoggedIn(true);
        })
        .catch(err => {
          console.log('Очищен jwt, т.к. не валидный');
          localStorage.removeItem('jwt');
          setLoggedIn(false);
          history.push('/signin');
        });
    }
  }

  function handleLogin(){
    handleTokenCheck();    
  }

  function handleMovieSave(){
    console.log('save movie');

  }

 
  return (
    <>
      <CurrentUserContext.Provider value = { currentUser } >
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
            loggedIn = {loggedIn}
            movies={filteredMovies}
            onChangeSearchString={handleChangeSearchString}
            searchString={searchString}
            onMovieSave={handleMovieSave}
            enableDelete={false}
          ></ProtectedRoute>
        </Route>
        <Route path='/saved-movies'>
          <ProtectedRoute 
            component={SavedMovies} 
            loggedIn = {loggedIn} 
            enableDelete={true} 
            movies={savedMovies}>

            </ProtectedRoute>
        </Route>
        <Route path='/profile'>
          <Profile></Profile>
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

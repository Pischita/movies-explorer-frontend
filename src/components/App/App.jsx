import { Route, Switch } from 'react-router-dom';
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

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchString, setSearchString] = useState('');

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

  function handleChangeSearchString(evt) {
    console.log(evt.target.value);
    setSearchString(evt.target.value);
  }



  
  
  return (
    <>
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
          <Movies
            movies={filteredMovies}
            onChangeSearchString={handleChangeSearchString}
            searchString={searchString}
            enableDelete={false}
          ></Movies>
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies enableDelete={true}></SavedMovies>
        </Route>
        <Route path='/profile'>
          <Profile></Profile>
        </Route>
        <Route path='/signin'>
          <Login></Login>
        </Route>
        <Route path='/signup'>
          <Register></Register>
        </Route>

        <Route path='*'>
          <NotFound></NotFound>
        </Route>
      </Switch>
    </>
  );
}

export default App;

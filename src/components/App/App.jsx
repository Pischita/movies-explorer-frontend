import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

function App() {
  return (
    <>
    <Switch>
      <Route exact path="/">
        <div className="promo">
          <Header></Header>
          <div className="promo__banner">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          </div>
        </div>
        <NavTab></NavTab>
        <main>
          <AboutProject></AboutProject>
          <Techs></Techs>
          <AboutMe></AboutMe>
        </main>
        <Footer></Footer>
      </Route>
      <Route path="/movies">
        <Movies></Movies>
      </Route>
      <Route path="/saved-movies">

      </Route>
      <Route path="/profile">

      </Route>
      <Route path="/signin">

      </Route>
      <Route path="/signup">

      </Route>

      </Switch>

    </>
  );
}

export default App;

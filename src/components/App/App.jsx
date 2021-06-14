import './App.css';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function App() {
  return (
    <>
      <div className="promo">
        <Header></Header>  
        <div className="promo__banner">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        </div>
      </div> 
      <NavTab></NavTab>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>

      
      <main></main>
      <footer></footer>
    </>
  );
}

export default App;

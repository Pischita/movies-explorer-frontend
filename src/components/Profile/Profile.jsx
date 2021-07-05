import './Profile.css';
import Header from '../Header/Header';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile({onEditProfile}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  function handleUserChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleFormSubmit(evt){
    evt.preventDefault();
    onEditProfile(name, email);
  }

  return (
    <div className='profile'>
      <Header></Header>
      <div className='profile__content'>
        <h1 className="profile__title">Привет, {name}!</h1>

        <form className="profile__form" method="post" onSubmit={handleFormSubmit} >
          <div className='profile__formgroup'>
            <label className="profile__label" htmlFor='name'>Имя</label>
            <input className="profile__input" id='name' value={name} onChange={handleUserChange} type="text" />
          </div>
          <div className='profile__formgroup'>
            <label className="profile__label" htmlFor='email'>E-mail</label>
            <input className="profile__input" id='email' value={email} onChange={handleEmailChange} type="email" />
          </div>
            <div className="profile__button-group">
                <button className="profile__submit" type='submit'>Редактировать</button>
            </div>          
        </form>
        <Link className="profile__signout" to='/singout'>Выйти из аккаунта</Link>
      </div>
    </div>
  );
}

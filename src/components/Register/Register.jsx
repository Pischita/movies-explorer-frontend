import './Register.css';
import Header from '../Header/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register, login } from '../../utils/MainApi';
import { useHistory } from 'react-router-dom';

export default function Register({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    setErrorMessage('');
    evt.preventDefault();
    register(name, email, password)
      .then((user) => {
        onSubmit(email, password);
      })
      .catch((err) => {
        setErrorMessage('При регистрации пользователя произошла ошибка');
      });
  }

  return (
    <div className='register'>
      <Header></Header>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form
        className='register__form'
        action=''
        method='POST'
        onSubmit={handleSubmit}
      >
        <div className='register__input-group'>
          <label className='register__label' htmlFor='name'>
            Имя
          </label>
          <input
            className='register__input'
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className='register__input-group'>
          <label className='register__label' htmlFor='email'>
            E-mail
          </label>
          <input
            className='register__input'
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className='register__input-group'>
          <label className='register__label' htmlFor='password'>
            Password
          </label>
          <input
            className='register__input'
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <p className='register__error'>{errorMessage}</p>

        <button className='register__submit' type='submit'>
          Зарегистрироваться
        </button>
      </form>
      <div className='register__login-wrapper'>
        <p className='register__login-text'>Уже зарегистрированы?</p>
        <Link className='register__login-link' to='/signin'>
          Войти
        </Link>
      </div>
    </div>
  );
}

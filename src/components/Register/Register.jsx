import './Register.css';
import Header from '../Header/Header';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { register, login } from '../../utils/MainApi';
import { useHistory } from 'react-router-dom';

export default function Register({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const [nameDirty, setNameDirty] = useState(false);
  const [errorName, setErrorName] = useState('Имя должно быть заполнено');
  const [emailDirty, setEmailDirty] = useState(false);
  const [errorEmail, setErrorEmail] = useState('Email должен быть заполнен');

  const [passwordDirty, setPasswordDirty] = useState(false);
  const [errorPassword, setErrorPassword] = useState('Укажите пароль');

  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    if (!emailDirty && !passwordDirty && !nameDirty) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }

    console.log(disableSubmit);

  }, [passwordDirty, emailDirty, password, email, nameDirty, name]);

  useEffect(() => {
    setDisableSubmit(true);
  }, []);



  function handleBlur(evt) {
    
  }

  function handleNameChange(evt) {
    const value = evt.target.value;
    setName(evt.target.value);
    if(value.length < 2){
      setErrorName('Введите имя');
      setNameDirty(true);
    } else {
      setErrorName('')
      setNameDirty(false);
    }
  }

  function handleEmailChange(evt) {
    const value = evt.target.value;
    setEmail(value);

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (value.length < 2) {
      setErrorEmail('Введите email');
      setEmailDirty(true);
    } else if (!re.test(String(value).toLowerCase())) {
      setErrorEmail('Email не корректный');
      setEmailDirty(true);
    } else {
      setErrorEmail('')
      setEmailDirty(false);
    }
  }

  function handlePasswordChange(evt) {
    const value = evt.target.value;
    setPassword(value);

    if(value.length <= 2){
        setErrorPassword('Пароль должен быть больше 2х символов');
        setPasswordDirty(true);
    }else{
        setErrorPassword('');
        setPasswordDirty(false);
    }
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
            onBlur={handleBlur}
            required
          />
        </div>
        {nameDirty && <p className="profile__input-error">{errorName}</p>}

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
            onBlur={handleBlur}
            required
          />
        </div>
        {emailDirty && <p className="register__input-error">{errorEmail}</p>}

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
            onBlur={handleBlur}
            required
          />
        </div>
        {passwordDirty && <p className="register__input-error">{errorPassword}</p>}
        <p className='register__error'>{errorMessage}</p>

        <button className='register__submit' type='submit' disabled={disableSubmit}>
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

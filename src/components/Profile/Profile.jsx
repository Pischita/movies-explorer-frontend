import './Profile.css';
import Header from '../Header/Header';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile({onEditProfile}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [nameDirty, setNameDirty] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [errorEmail, setErrorEmail]= useState('');
  const [disableSubmit, setDisableSubmit] = useState(true); 

  function handleUserChange(evt) {
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

  useEffect(()=>{
    if(!nameDirty && !emailDirty){
      setDisableSubmit(false);
    }else{
      setDisableSubmit(true);
    }
  }, [nameDirty, emailDirty]);

  function handleEmailChange(evt) {
    const value = evt.target.value;
    setEmail(value);

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   

    if(value.length < 2){
      setErrorEmail('Введите email');
      setEmailDirty(true);
    } else if( ! re.test(String(value).toLowerCase()) ){
      setErrorEmail('Email не корректный');
      setEmailDirty(true);
    } else {
      setErrorEmail('')
      setEmailDirty(false);
    }  
  }

  function handleFormSubmit(evt){
    evt.preventDefault();
    onEditProfile(name, email);
  }

  function handleBlur(evt){
    switch (evt.target.name) {
      case 'name' :
        setNameDirty(true);
        break;
      case 'email' : 
        setEmailDirty(true);
        break;
      default :
        
    }

  }

  return (
    <div className='profile'>
      <Header></Header>
      <div className='profile__content'>
        <h1 className="profile__title">Привет, {name}!</h1>

        <form className="profile__form" method="post" onSubmit={handleFormSubmit} >
          <div className='profile__formgroup'>
            <label className="profile__label" htmlFor='name'>Имя</label>
            <input onBlur={handleBlur} className="profile__input" id='name' value={name} onChange={handleUserChange} type="text" />
          </div>
          {nameDirty && <p className="profile__input-error">{errorName}</p>}
          <div className='profile__formgroup'>
            <label className="profile__label" htmlFor='email'>E-mail</label>
            <input onBlur={handleBlur} className="profile__input" id='email' value={email} onChange={handleEmailChange} type="email" />
          </div>
          {emailDirty && <p className="profile__input-error">{errorEmail}</p>}
            <div className="profile__button-group">
                <button className="profile__submit" type='submit' disabled={disableSubmit} >Редактировать</button>
            </div>          
        </form>
        <Link className="profile__signout" to='/singout'>Выйти из аккаунта</Link>
      </div>
    </div>
  );
}

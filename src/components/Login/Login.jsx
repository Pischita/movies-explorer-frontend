import './Login.css';
import Header from '../Header/Header';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Login({onSubmit, errorMessage}) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailDirty, setEmailDirty] = useState(false);
    const [errorEmail, setErrorEmail] = useState('');

    const [passwordDirty, setPasswordDirty] = useState(false);
    const [errorPassword, setErrorPassword] = useState('');

    const [disableSubmit, setDisableSubmit] = useState(true);

    useEffect(()=>{
        if(!emailDirty && !passwordDirty){
          setDisableSubmit(false);
        }else{
          setDisableSubmit(true);
        }
        console.log(disableSubmit);
      }, [passwordDirty, emailDirty, password, email]);
    
      useEffect(()=>{
        setDisableSubmit(true);
      }, []);
    


    function handleBlur(evt){
        switch (evt.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            
            default:
                break;
        }
    }


    function handleEmailChange(evt){
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

    function handlePasswordChange(evt){
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

    function handleSubmit(evt){
        evt.preventDefault();
        onSubmit(email, password);       
    }

    return(
        <div className="login">
            <Header></Header>
            <h1 className="login__title">Добро пожаловать!</h1>
            <form className="login__form" action="" method="post" onSubmit={handleSubmit}>
               
                <div className="login__input-group">
                    <label className="login__label" htmlFor="email" >E-mail</label>
                    <input className="login__input" id="email" type="email" name="email" value={email} onChange={handleEmailChange} onBlur={handleBlur} required />
                </div>
                {emailDirty && <p className="login__input-error">{errorEmail}</p>}

                <div className="login__input-group">
                    <label className="login__label" htmlFor="password" >Password</label>
                    <input className="login__input" id="password" type="password" name="password" value={password} onChange={handlePasswordChange} required />
                </div>
                {passwordDirty && <p className="login__input-error">{errorPassword}</p>}
                
                <p className='login__error'>{errorMessage}</p>

                <button className="login__submit" type="submit" disabled={disableSubmit}>Войти</button>
            </form>
            <div className="login__register-wrapper">
                <p className="login__register-text">Еще не зарегистрированы?</p>
                <Link className="login__register-link" to="/signup">Регистрация</Link>
            </div>
        </div>
    )
}

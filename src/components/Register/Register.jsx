import './Register.css';
import Header from '../Header/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Register(){
    const [name, setName] = useState('Виталий');
    const [email, setEmail] = useState('aaib@tut.by');
    const [password, setPassword] = useState('');

    function handleNameChange(evt){
        setName(evt.target.value);
    }

    function handleEmailChange(evt){
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt){
        setPassword(evt.target.value);
    }


    return(
        <div className="register">
            <Header></Header>
            <h1 className="register__title">Добро пожаловать!</h1>
            <form className="register__form" action="" method="get">
                <div className="register__input-group">
                    <label className="register__label" htmlFor="name" >Имя</label>
                    <input className="register__input" id="name" type="text" name="name" value={name} onChange={handleNameChange} required />
                </div>

                <div className="register__input-group">
                    <label className="register__label" htmlFor="email" >E-mail</label>
                    <input className="register__input" id="email" type="email" name="email" value={email} onChange={handleEmailChange} required />
                </div>

                <div className="register__input-group">
                    <label className="register__label" htmlFor="password" >Password</label>
                    <input className="register__input" id="password" type="password" name="password" value={password} onChange={handlePasswordChange} required />
                </div>

                <button className="register__submit" type="submit">Зарегистрироваться</button>
            </form>
            <div className="register__login-wrapper">
                <p className="register__login-text">Уже зарегистрированы?</p>
                <Link className="register__login-link" to="/signin">Войти</Link>
            </div>
        </div>
    )
}
import './Login.css';
import Header from '../Header/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import { useHistory } from 'react-router-dom';

export default function Login({onSubmit}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function handleEmailChange(evt){
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt){
        setPassword(evt.target.value);
    } 

    function handleSubmit(evt){
        evt.preventDefault();
        mainApi.login(email, password).then((data) =>{
            console.log(data);
            if(data.jwt){
                setEmail('');
                setPassword('');
                localStorage.setItem('jwt', data.jwt);
                onSubmit();
                history.push('/movies');
            }
          }).catch(err =>{
            console.log(err);
          });
       
    }

    return(
        <div className="login">
            <Header></Header>
            <h1 className="login__title">Добро пожаловать!</h1>
            <form className="login__form" action="" method="post" onSubmit={handleSubmit}>
               
                <div className="login__input-group">
                    <label className="login__label" htmlFor="email" >E-mail</label>
                    <input className="login__input" id="email" type="email" name="email" value={email} onChange={handleEmailChange} required />
                </div>

                <div className="login__input-group">
                    <label className="login__label" htmlFor="password" >Password</label>
                    <input className="login__input" id="password" type="password" name="password" value={password} onChange={handlePasswordChange} required />
                </div>

                <button className="login__submit" type="submit">Войти</button>
            </form>
            <div className="login__register-wrapper">
                <p className="login__register-text">Еще не зарегистрированы?</p>
                <Link className="login__register-link" to="/signup">Регистрация</Link>
            </div>
        </div>
    )
}

import './Profile.css';
import Header from '../Header/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Profile(){
    const [name, setName] = useState('Виталий');
    const [email, setEmail] = useState('')

    function handleUserChange(evt){
        setName(evt.target.value);
    }

    function handleEmailChange(evt){
        setEmail(evt.target.value);
    }

    return(
        <div className="profile">
            <Header></Header>
            <h1>Привет, {name}!</h1>

            <form>
                <div className="profile__formgroup">
                    <label htmlFor="name">Имя</label>
                    <input id="name" value={name} onChange={handleUserChange} />
                </div>
                <div className="profile__formgroup">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" value={email} onChange={handleEmailChange} />
                </div>

                <button type="submit">Редактировать</button>               
            </form>
            <Link to="/singout">Выйти из аккаунта</Link>
            
        </div>
    );
}
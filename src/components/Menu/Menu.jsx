import { Link } from 'react-router-dom';
import './Menu.css';


export default function Menu() {
    return (<nav className="menu">
        <ul className="menu__list">
            <li className="menu__item"><Link className="menu__link" to="/signup">Регистрация</Link></li>
            <li className="menu__item"><Link className="menu__link menu__link-button" to="/signin">Войти</Link></li>
        </ul>
    </nav>);
}

import './Menu.css';

export default function Menu() {
    return (<nav className="menu">
        <ul className="menu__list">
            <li className="menu__item"><a className="menu__link" href="/register">Регистрация</a></li>
            <li className="menu__item"><a className="menu__link menu__link-button" href="/login">Войти</a></li>
        </ul>
    </nav>);
}

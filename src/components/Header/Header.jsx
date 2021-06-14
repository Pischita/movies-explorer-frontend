import logoImage from '../../images/logo.svg';
import './Header.css';
import Menu from '../Menu/Menu';

export default function Header() {
    return(<header className="header">
        <img className="header__logo" src={logoImage} alt="Логотип" />
        <Menu></Menu>
        </header>
    );
}
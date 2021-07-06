import logoImage from '../../images/logo.svg';
import './Header.css';
import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom';

export default function Header() {
    return(<header className="header">
        <Link to="/"><img className="header__logo" src={logoImage} alt="Логотип" /></Link>
        <Menu></Menu>
        </header>
    );
}
import { useContext, useState } from 'react';
import { Link, NavLink, Switch, Route } from 'react-router-dom';
import './Menu.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'; 

export default function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    function handleOpenMenu(){
        setIsMenuOpen( ! isMenuOpen);
    }

    return (<nav className="menu">
        <Switch>
            <Route exact path="/">
                <ul className="menu__main-list">
                    <li className="menu__item"><Link className="menu__link" to="/signup">Регистрация</Link></li>
                    <li className="menu__item"><Link className="menu__link menu__link-button" to="/signin">Войти</Link></li>
                </ul>
            </Route>

            <Route path="/signup">

            </Route>

            <Route path="/signin">

            </Route>

            <Route path="*">
                <div className={'menu__outline' + (isMenuOpen ? '' : ' menu__outline_open' )}>
                    <div className={'menu__wrapper_justify_between' + (isMenuOpen ? '' : ' menu__wrapper_justify_between_open' )}>
                        <ul className="menu__list">
                            <li className="menu__item menu__item_mobile"><NavLink className="menu__link menu__link_color_black" activeClassName="menu__link_active" exact to="/">Главная</NavLink></li>
                            <li className="menu__item"><NavLink className="menu__link menu__link_color_black" activeClassName="menu__link_active" to="/movies">Фильмы</NavLink></li>
                            <li className="menu__item"><NavLink className="menu__link menu__link_color_black" to="/saved-movies">Сохраненные фильмы</NavLink></li>
                        </ul>
                        <ul className="menu__list">
                            <li className="menu__item"><Link className="menu__link-user menu__link_color_black" to="/profile">{currentUser.name}<span className="menu__user-icon"></span></Link></li>
                        </ul>
                        
                    </div>
                    <button className="menu__burger-close" onClick={handleOpenMenu}></button>
                </div>
                <div className="menu__burger">
                    <button className="menu__burger-button" onClick={handleOpenMenu} >
                    </button>
                </div>



            </Route>
        </Switch>

    </nav>);
}

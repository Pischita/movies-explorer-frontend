import { Link, NavLink, Switch, Route } from 'react-router-dom';
import './Menu.css';


export default function Menu() {
    return (<nav className="menu">
        <Switch>
            <Route exact path="/">
                <ul className="menu__list menu__list_align_right">
                    <li className="menu__item"><Link className="menu__link" to="/signup">Регистрация</Link></li>
                    <li className="menu__item"><Link className="menu__link menu__link-button" to="/signin">Войти</Link></li>
                </ul>
            </Route>

            <Route path="/signup">

            </Route>

            <Route path="/signin">

            </Route>

            <Route path="*">
                <div className="menu__outline">
                    <div className="menu__wrapper_justify_between">
                        <ul className="menu__list">
                            <li className="menu__item"><NavLink className="menu__link menu__link_color_black" activeClassName="menu__link_active" to="/movies">Фильмы</NavLink></li>
                            <li className="menu__item"><NavLink className="menu__link menu__link_color_black" to="/saved-movies">Сохраненные фильмы</NavLink></li>
                        </ul>
                        <ul className="menu__list">
                            <li className="menu__item"><Link className="menu__link-user menu__link_color_black" to="/profile">Аккаунт<span className="menu__user-icon"></span></Link></li>
                        </ul>
                        
                    </div>
                    <button className="menu__burger-close"></button>
                </div>
                <div className="menu__burger">
                    <button className="menu__burger-button" >
                    </button>
                </div>



            </Route>
        </Switch>

    </nav>);
}

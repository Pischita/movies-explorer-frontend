import './NavTab.css';
export default function NavTab(){
    return(
        <nav className="navtab">
            <ul className="navtab__list">
                <li className="navtab__item"><a className="navtab__link" href="#about">О проекте</a></li>
                <li className="navtab__item"><a className="navtab__link" href="#technology">Технологии</a></li>
                <li className="navtab__item"><a className="navtab__link" href="#student">Студент</a></li>
            </ul>

        </nav>
    );

}
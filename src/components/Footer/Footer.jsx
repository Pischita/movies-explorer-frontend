import './Footer.css';

export default function Footer(){
    return(
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__menu">
                <p>&#169; 2021</p>
                <nav className="footer__navigation">
                    <ul className="footer__navigation-list">
                        <li><a className="footer__navigation-link" href="https://praktikum.yandex.ru/">Яндекс.Практикум</a></li>
                        <li><a className="footer__navigation-link" href="https://github.com">Github</a></li>
                        <li><a className="footer__navigation-link" href="https://facebook.com">Facebook</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}
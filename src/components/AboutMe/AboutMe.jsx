import './AboutMe.css';
import photo from '../../images/photo.jpg';

export default function AboutMe(){
    return (
        <section className="about-me" id="student">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__content-wrapper">
                <div className="about-me__content">
                    <p className="about-me__name">Иван</p>
                    <p className="about-me__profession">Фронтенд-разработчик, 36 лет</p>
                    <p className="about-me__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, 
                    как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    
                    <ul className="about-me__social-networks">
                        <li><a className="about-me__social-networks-link" href="#facebook">Facebook</a></li>
                        <li><a className="about-me__social-networks-link" href="#github">Github</a></li>
                    </ul>
                </div>
                <img src={photo} alt="Моя фотография" className="about-me__image" />
            </div>
            <h3 className="about-me__portfolio-title">Портфолио</h3>
            <ul className="about-me__portfolio-list">
                <li className="about-me__portfolio-item">Статичный сайт<a className="about-me__portfolio-link" href="#q"> </a></li>
                <li className="about-me__portfolio-item">Адаптивный сайт<a className="about-me__portfolio-link" href="#q"> </a></li>
                <li className="about-me__portfolio-item">Одностроничное приложение<a className="about-me__portfolio-link" href="#q"> </a></li>
            </ul>
        </section>
    );
}
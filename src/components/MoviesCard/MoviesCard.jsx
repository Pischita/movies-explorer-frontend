import './MoviesCard.css';
import moviePicture from '../../images/movie-1.jpg';

export default function MoviesCard ({saved = false}){
    return(
        <div className="movie-card">
            <img className="movie-card__image" src={moviePicture} alt="" />
            <div className="movie-card__title-wrapper">
                <h2 className="movie-card__title">33 слова о дизайне</h2>
                <button className={'movie-card__save-icon' + (saved ? '' : ' movie-card__save-icon_active') }></button>
            </div>
            
            <p className="movie-card__duration">1ч22м</p>
        </div>
    )
}
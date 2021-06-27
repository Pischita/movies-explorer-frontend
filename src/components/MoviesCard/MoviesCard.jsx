import './MoviesCard.css';
import moviePicture from '../../images/movie-1.jpg';

export default function MoviesCard ({ name ='', saved = false, duration=''}){
    return(
        <div className="movie-card">
            <img className="movie-card__image" src={moviePicture} alt="{name}" />
            <div className="movie-card__title-wrapper">
                <h2 className="movie-card__title">{name}</h2>
                <button className={'movie-card__save-icon' + (saved ? ' movie-card__save-icon_active' : '') }></button>
            </div>
            
            <p className="movie-card__duration">{duration}</p>
        </div>
    )
}
import './MoviesCard.css';

export default function MoviesCard ({ name ='', movieId, saved = false, duration='', enableDelete, image, onMovieSave, trailer}){

    function handleClickSaveMovie(evt){
        if (enableDelete) {
            onMovieSave(movieId, true);
        } else {
            onMovieSave(movieId, saved);
        }
        
    }

    let iconType = '';
    if(enableDelete === true) {
        iconType = 'movie-card__icon_type_delete'; 
    }else if (saved){
        iconType = 'movie-card__icon_type_save';
    }else{
        iconType = 'movie-card__icon_type_added';
    }

    return(
        <div className="movie-card">
            <a href={trailer} target="_blank" rel="noreferrer">
                <img className="movie-card__image" src={image} alt={name} />
            </a>
            
            <div className="movie-card__title-wrapper">
                <h2 className="movie-card__title">{name}</h2>
                <button className={'movie-card__icon ' + iconType } onClick={handleClickSaveMovie}></button>
            </div>
            
            <p className="movie-card__duration">{duration}</p>
        </div>
    )
}
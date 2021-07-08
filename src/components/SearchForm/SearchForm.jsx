import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({searchString, onChangeSearchString, isShortFilms, onChangeShortFilms, onClickSearchForm}) {
    return (
        <form className="search-form" action="/movies">
            <div className="search-form__input-group">
                <input className="search-form__input" onChange={onChangeSearchString} name="searchString" placeholder="Фильм" value={searchString} />
                <button className="search-form__button" type="submit" onClick={onClickSearchForm}>Поиск</button>
            </div>
            <div className="search-form__filter">
                <FilterCheckbox text="Короткометражки" isShortFilms={isShortFilms} onChangeShortFilms={onChangeShortFilms}></FilterCheckbox> 
            </div>            
        </form>        
    );
}
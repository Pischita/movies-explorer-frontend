import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({searchString, onChangeSearchString}) {
    return (
        <form className="search-form" action="/movies">
            <div className="search-form__input-group">
                <input className="search-form__input" onChange={onChangeSearchString} name="searchString" placeholder="Фильм" value={searchString} required />
                <button className="search-form__button" type="submit">Поиск</button>
            </div>
            <div className="search-form__filter">
                <FilterCheckbox text="Короткометражки"></FilterCheckbox> 
            </div>            
        </form>        
    );
}
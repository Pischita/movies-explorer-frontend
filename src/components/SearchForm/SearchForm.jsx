import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
    return (
        <form className="search-form" action="/movies">
            <div className="search-form__input-group">
                <input className="search-form__input" name="searchString" placeholder="Фильм" />
                <button className="search-form__button" type="submit">Поиск</button>
            </div>
            <div className="search-form__filter">
                <FilterCheckbox text="Короткометражки"></FilterCheckbox> 
            </div>            
        </form>        
    );
}
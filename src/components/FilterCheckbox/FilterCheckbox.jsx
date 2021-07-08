import './FilterCheckbox.css';

export default function FilterCheckbox({text, isShortFilms, onChangeShortFilms}) {
    function handleChange(evt){
        onChangeShortFilms( !isShortFilms);
    }
    

    return (
        <div className="filter-checkbox__wrapper">
        <label className="filter-checkbox">
            <input className="filter-checkbox__input" type="checkbox" value={isShortFilms} onChange={handleChange}/>
            <span className="filter-checkbox__slider"></span>            
        </label>
        <span className="filter-checkbox__text">{text}</span>
        </div>
        
    );
}
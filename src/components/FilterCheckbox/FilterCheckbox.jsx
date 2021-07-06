import './FilterCheckbox.css';

export default function FilterCheckbox({text}) {
    return (
        <div className="filter-checkbox__wrapper">
        <label className="filter-checkbox">
            <input className="filter-checkbox__input" type="checkbox" />
            <span className="filter-checkbox__slider"></span>
            
        </label>
        <span className="filter-checkbox__text">{text}</span>
        </div>
        
    );
}
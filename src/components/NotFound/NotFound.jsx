import './NotFound.css';
import { useHistory } from 'react-router-dom';

export default function NotFound(){
    const history = useHistory();

    function handleClick(){
        history.goBack();
    }

    

    return(
        <div className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <button className="not-found__back" type="button" onClick={handleClick}>Назад</button>
        </div>
    )
}
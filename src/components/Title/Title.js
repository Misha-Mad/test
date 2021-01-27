import {Link} from "react-router-dom";
import './Title.css';

function Title() {
    return (
        <main className={'main'}>
            <h1 className={'main__title'}>Приветствую! </h1>
            <p className={'main__subtitle'}>Рад вам представить простое приложение,
                которое визуализирует данные стороннего API и
                показывает продолжительность дня.</p>
            <Link to="/day-length" className={'main__link'} >Начать</Link>
        </main>
    )
}

export default Title;
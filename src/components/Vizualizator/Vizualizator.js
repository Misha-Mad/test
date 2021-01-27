import {Link} from "react-router-dom";
import './Vizualizator.css';

function Vizualizator({ info, date, civilTwilightBeginInPercent, civilTwilightEndInPercent }) {

    function formatDate(date) {
        return date.split('-').reverse().join().replace(/,/g,'/');
    }

    return (
        <div className={'main'}>
            <h1 className={'main__title'}>{formatDate(date)}</h1>
            <p>Sunrise: {info.sunrise}</p>
            <p>Sunset: {info.sunset}</p>
            <p>Length: {info.day_length}</p>
            <div className={'main__diagramma'}
                 style={{background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) ${civilTwilightBeginInPercent}%, rgba(0,212,240,1) ${civilTwilightEndInPercent}%, rgba(2,0,36,1) 100%)`}}/>
            <Link to='/' className={'main__link'}>Начать</Link>
        </div>
    )
}

export default Vizualizator;
import {Link} from "react-router-dom";
import {useEffect, useState} from 'react';
import './Vizualizator.css';
import {todayDateCalculate} from '../../utils/dateFormat';
import sunriseApi from '../../utils/SunRiseAPI';

function Vizualizator() {

    const [info, setInfo] = useState({});
    const [civilTwilightBeginInPercent, setCivilTwilightBeginInPercent] = useState(30);
    const [civilTwilightEndInPercent, setcivilTwilightEndInPercent] = useState(70);

    const timeInSeconds = function (time) {
        let secondsSum;
        time.includes('AM') ? secondsSum = 0 : secondsSum = 720;
        const arr = time.split(':', 2);
        arr.forEach((e, i) => {
            if (i === 0) {
                secondsSum += e * 60;
            }
            if (i === 1) {
                secondsSum += +e;
            }
        })
        let onePercent = 1440 / 100;
        console.log(secondsSum / onePercent)
        return secondsSum / onePercent;
    }

    const todayDate = todayDateCalculate();
    useEffect(() => {
        sunriseApi.getInfo(todayDate)
            .then((res) => {
                setInfo(res.results);
                setCivilTwilightBeginInPercent(timeInSeconds(res.results.civil_twilight_begin));
                setcivilTwilightEndInPercent(timeInSeconds(res.results.civil_twilight_end));
            })
    }, [todayDate])

    return (
        <div className={'main'}>
            <h1 className={'main__title'}>{todayDate}</h1>
            <p>sunrise: {info.sunrise}</p>
            <p>sunset: {info.sunset}</p>
            <p>length: {info.day_length}</p>
            <div className={'main__diagramma'}
                 style={{background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) ${civilTwilightBeginInPercent}%, rgba(0,212,240,1) ${civilTwilightEndInPercent}%, rgba(2,0,36,1) 100%)`}}/>
            <Link to='/' className={'main__link'}>Начать</Link>
        </div>
    )
}

export default Vizualizator;
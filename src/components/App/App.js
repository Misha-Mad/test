import './App.css';
import {useEffect, useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import Title from '../Title/Title';
import Vizualizator from '../Vizualizator/Vizualizator';
import {todayDateCalculate} from '../../utils/dateFormat';
import sunriseApi from "../../utils/SunRiseAPI";

function App() {
    const [info, setInfo] = useState({});
    const [civilTwilightBeginInPercent, setCivilTwilightBeginInPercent] = useState(30);
    const [civilTwilightEndInPercent, setcivilTwilightEndInPercent] = useState(70);
    const [date, setDate] = useState('1989-10-30');
    const [latitude, setLatitude] = useState('59.9710000');
    const [longitude, setLongitude] = useState('30, 3890000');

    function timeInPercents (time) {
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

    useEffect(() => {
        setDate(todayDateCalculate());
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setLatitude(position.coords.latitude.toFixed(7));
                setLongitude(position.coords.longitude.toFixed(7));
            }
        );
    }, [])

    useEffect(() => {
        sunriseApi.getInfo(date, latitude, longitude)
            .then((res) => {
                setInfo(res.results);
                setCivilTwilightBeginInPercent(timeInPercents(res.results.civil_twilight_begin));
                setcivilTwilightEndInPercent(timeInPercents(res.results.civil_twilight_end));
            })
    }, [date])

    return (
        <div className='App'>
            <Switch>
                <Route exact path="/">
                    <Title/>
                </Route>
                <Route path="/day-length">
                    <Vizualizator info={info} date={date} civilTwilightBeginInPercent={civilTwilightBeginInPercent} civilTwilightEndInPercent={civilTwilightEndInPercent}/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;

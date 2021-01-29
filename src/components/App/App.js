import './App.css';
import {useState, useEffect, useCallback} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Title from '../Title/Title';
import Vizualizator from '../Vizualizator/Vizualizator';
import Loader from '../Loader/Loader';
import sunriseApi from "../../utils/SunRiseAPI";

function App() {
    const [info, setInfo] = useState({});
    const [civilTwilightBeginInPercent, setCivilTwilightBeginInPercent] = useState(30);
    const [civilTwilightEndInPercent, setcivilTwilightEndInPercent] = useState(70);
    const [sunriseTime, setSunriseTime] = useState('00:00:00');
    const [sunsetTime, setSunsetTime] = useState('00:00:00');
    const [date, setDate] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [isLoading, setLoading] = useState(false);

    function timeInPercents(time) {
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
        return secondsSum / onePercent;
    }

    function formatTime(results) {
        setSunriseTime(results.sunrise.replace(' AM', ''));
        let newSunsetTime = results.sunset.replace(' PM', '').split(':');
        newSunsetTime[0] = +newSunsetTime[0] + 12;
        newSunsetTime = newSunsetTime.join(':');
        setSunsetTime(newSunsetTime);
    }

    function todayDateCalculate() {
        const todayDate = new Date();
        return todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
    }

    useEffect(() => {
        const newDate = todayDateCalculate();
        setDate(newDate);
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude.toFixed(7));
            setLongitude(position.coords.longitude.toFixed(7));
        });
    }, [])

    const getInfo = useCallback(() => {
        setLoading(true);
        sunriseApi.getInfo(date, latitude, longitude)
            .then((res) => {
                setInfo(res.results);
                setCivilTwilightBeginInPercent(timeInPercents(res.results.civil_twilight_begin));
                setcivilTwilightEndInPercent(timeInPercents(res.results.civil_twilight_end));
                formatTime(res.results);
            })
            .then(()=> setTimeout(()=> {
                setLoading(false)
            }, 3000))
            .catch(err => console.log(err))
    }, [date, latitude, longitude])


    return (
        <div className='App'>
            <Switch>
                <Route exact path="/">
                    <Title/>
                </Route>
                <Route path="/day-length">
                    {longitude || latitude !== '' ?
                        <Vizualizator
                            isLoading={isLoading}
                            onGetInfo={getInfo}
                            info={info}
                            date={date}
                            civilTwilightBeginInPercent={civilTwilightBeginInPercent}
                            civilTwilightEndInPercent={civilTwilightEndInPercent}
                            sunriseTime={sunriseTime}
                            sunsetTime={sunsetTime}
                        />
                        : <Redirect to={'/'}/>}
                </Route>
            </Switch>
        </div>
    );
}

export default App;

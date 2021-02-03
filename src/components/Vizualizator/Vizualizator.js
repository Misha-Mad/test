import {useEffect, useState} from 'react';
import './Vizualizator.css';
import Loader from '../Loader/Loader'

function Vizualizator({
                          isLoading,
                          onGetInfo,
                          info,
                          date,
                          onDate,
                          civilTwilightBeginInPercent,
                          civilTwilightEndInPercent,
                          sunriseTime,
                          sunsetTime,
                          onTodayDateCalculate
                      }) {

    const [disabledWeekAgoButton, setDisabledWeekAgoButton] = useState(false);
    const [disabledDayAgoButton, setDisabledDayAgoButton] = useState(false);
    const [disabledWeekAfterButton, setDisabledWeekAfterButton] = useState(false);
    const [disabledDayAfterButton, setDisabledDayAfterButton] = useState(false);

    function formatDate(date) {
        return date.split('-').reverse().join().replace(/,/g, '/');
    }


    useEffect(() => {
        onGetInfo();
    }, [onGetInfo])

    function handleGetDataWeekAgo() {
        const newDate = onTodayDateCalculate(-7);
        onDate(newDate);
        onGetInfo();
        setDisabledWeekAgoButton(true);
        setDisabledDayAgoButton(false);
        setDisabledWeekAfterButton(false);
        setDisabledDayAfterButton(false);
    }

    function handleGetDataDayAgo() {
        const newDate = onTodayDateCalculate(-1);
        onDate(newDate);
        onGetInfo();
        setDisabledWeekAgoButton(false);
        setDisabledDayAgoButton(true);
        setDisabledWeekAfterButton(false);
        setDisabledDayAfterButton(false);
    }

    function handleGetDataWeekAfter() {
        const newDate = onTodayDateCalculate(7);
        onDate(newDate);
        onGetInfo();
        setDisabledWeekAgoButton(false);
        setDisabledDayAgoButton(false);
        setDisabledWeekAfterButton(true);
        setDisabledDayAfterButton(false);
    }

    function handleGetDataDayAfter() {
        const newDate = onTodayDateCalculate(1);
        onDate(newDate);
        onGetInfo();
        setDisabledWeekAgoButton(false);
        setDisabledDayAgoButton(false);
        setDisabledWeekAfterButton(false);
        setDisabledDayAfterButton(true);
    }

    return (
        <div className={'main'}>
            {isLoading ?
                <Loader/> :
                <>
                    <h1 className={'main__title'}>{formatDate(date)}</h1>
                    <p>Sunrise: {sunriseTime}</p>
                    <p>Sunset: {sunsetTime}</p>
                    <p>Length: {info.day_length}</p>
                    <div className={'main__diagramma'}
                         style={{background: `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,212,255,1) ${civilTwilightBeginInPercent}%, rgba(0,212,240,1) ${civilTwilightEndInPercent}%, rgba(0,0,0,1) 100%)`}}/>
                    <div className={'main__dateControls'}>
                        <button disabled={disabledWeekAgoButton} className={'main__dateButton'} onClick={handleGetDataWeekAgo}>- 7 days</button>
                        <button disabled={disabledDayAgoButton} className={'main__dateButton'} onClick={handleGetDataDayAgo}>- 1 day</button>
                        <button disabled={disabledDayAfterButton} className={'main__dateButton'} onClick={handleGetDataDayAfter}>+ 1 day</button>
                        <button disabled={disabledWeekAfterButton} className={'main__dateButton'} onClick={handleGetDataWeekAfter}>+ 7 days</button>
                    </div>
                </>
            }
        </div>
    )
}

export default Vizualizator;
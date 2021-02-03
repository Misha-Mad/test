import {useEffect} from 'react';
import './Vizualizator.css';
import Loader from '../Loader/Loader'

function Vizualizator({
                          isLoading,
                          onGetInfo,
                          info,
                          date,
                          civilTwilightBeginInPercent,
                          civilTwilightEndInPercent,
                          sunriseTime,
                          sunsetTime
                      }) {

    function formatDate(date) {
        return date.split('-').reverse().join().replace(/,/g, '/');
    }


    useEffect(() => {
        onGetInfo();
    }, [onGetInfo])

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
                         style={{background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) ${civilTwilightBeginInPercent}%, rgba(0,212,240,1) ${civilTwilightEndInPercent}%, rgba(2,0,36,1) 100%)`}}/>
                    <div className={'main__dateControls'}>
                        <button className={'main__dateButton'}>- 7 days</button>
                        <button className={'main__dateButton'}>- 1 day</button>
                        <button className={'main__dateButton'}>+ 1 day</button>
                        <button className={'main__dateButton'}>+ 7 days</button>
                    </div>
                </>
            }
        </div>
    )
}

export default Vizualizator;
import './App.css';
import {useEffect, useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import Title from '../Title/Title';
import Vizualizator from '../Vizualizator/Vizualizator';

function App() {
  const [latitude  , setLatitude  ] = useState(59.9710000);
  const [longitude , setLongitude ] = useState(30,3890000);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        function(position) {
          setLatitude(position.coords.latitude.toFixed(7));
          setLongitude(position.coords.longitude.toFixed(7));
        }
    );
  }, [])

  return (
    <div className='App'>
      <Switch>
        <Route exact path="/">
          <Title/>
        </Route>
        <Route path="/day-length">
          <Vizualizator latitude={latitude} longitude={longitude}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

import './App.css';
import {Switch, Route} from 'react-router-dom';
import Title from '../Title/Title';
import Vizualizator from '../Vizualizator/Vizualizator';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path="/">
          <Title/>
        </Route>
        <Route path="/day-length">
          <Vizualizator/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

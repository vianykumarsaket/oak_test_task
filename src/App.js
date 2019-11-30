import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Welcome from './components/dashboard/Welcome';
import PlanetDetails from './components/planetDetails/PlanetDetails';
import NotFound from './components/notFound/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path='/' component={ Login } />
            <Route path='/dashboard' component={ Welcome } />
            <Route path='/planets/:id' component={ PlanetDetails } />
            <Route component={ NotFound } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
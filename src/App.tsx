import React, { lazy } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/home';
import Register from './pages/register';
import Create from './pages/create';
import PlayQuest from './pages/questionnaire/play'
import PrivateRoute from './components/PrivateRoute';
//const Home = lazy(() => import('./pages/home'));
//const NotFound = lazy(() => import('./pages/NotFound'));



function App() {
  return (
    <BrowserRouter>
     
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Register} />
          <PrivateRoute exact path="/create" component={Create} />
          <PrivateRoute exact path="/update/:quest" component={Create} />
          <PrivateRoute exact path="/play/:quest" component={PlayQuest} />
        </Switch>
    </BrowserRouter>
  );
}


export default App;


//export default App;

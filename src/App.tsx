import React, { lazy } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/home';
import Register from './pages/register';
import Create from './pages/create';
//const Home = lazy(() => import('./pages/home'));
//const NotFound = lazy(() => import('./pages/NotFound'));



function App() {
  return (
    <BrowserRouter>
     
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/create" component={Create} />
        </Switch>
    </BrowserRouter>
  );
}


export default App;


//export default App;

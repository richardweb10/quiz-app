import React, { lazy } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/home';
import Register from './pages/register';
//const Home = lazy(() => import('./pages/home'));
//const NotFound = lazy(() => import('./pages/NotFound'));



function App() {
  return (
    <BrowserRouter>
     
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Register} />
        </Switch>
    </BrowserRouter>
  );
}


export default App;


//export default App;

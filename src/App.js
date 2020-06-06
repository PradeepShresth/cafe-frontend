import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import { useAuth } from './hooks/auth-hook';

import Cafe from './containers/Cafe';
import Login from './containers/Login';

import { AuthContext } from './components/Context/auth-context';

import './App.css';

const App = props => {
  const { token, login, logout } = useAuth();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "/js/script.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
        document.body.removeChild(script);
    }
  });

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Cafe />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Cafe />
        </Route>
        <Route path="/veryverysecretpage">
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
    

  return (
    <div className="App">
      <AuthContext.Provider 
        value={{
          isLoggedIn: !!token,
          token: token,
          login: login, 
          logout: logout}}
      >
        <Router>
            {routes}
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

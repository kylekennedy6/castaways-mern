import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import NewGame from './game/pages/NewGame';
import InProgressGame from './game/pages/InProgressGame';
import UserGames from './game/pages/UserGames';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/my-games/:userId" exact>
          <UserGames />
        </Route>
        <Route path="/game/new-game" exact>
          <NewGame />
        </Route>
        <Route path="/game/:gameId" exact>
          <InProgressGame />
        </Route>
        <Redirect to="/game/new-game" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

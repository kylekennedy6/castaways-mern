import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import NewGame from './game/pages/NewGame';
import ActivityFeed from './game/pages/ActivityFeed';
import TribeChat from './game/pages/TribeChat';
import PrivateConversations from './game/pages/PrivateConversations';
import NewConversation from './game/pages/NewConversation';
import TribeStats from './game/pages/TribeStats';
import UserGames from './game/pages/UserGames';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import MostRecentPrivateConversationGetter from './game/pages/MostRecentPrivateConversationGetter';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/my-games/:userId" exact>
          <UserGames />
        </Route>
        <Route path="/new-game" exact>
          <NewGame />
        </Route>
        <Route path="/:gameId/activity-feed" exact>
          <ActivityFeed />
        </Route>
        <Route path="/:gameId/tribe-chat" exact>
          <TribeChat />
        </Route>
        <Route path="/:gameId/tribe-stats/" exact>
          <TribeStats />
        </Route>
        <Redirect to="/new-game" />
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

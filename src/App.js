import React, { Suspense } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MainNavigation from './Shared/components/Nevigation/MainNavigation';
import { AuthContext } from './Shared/context/Auth-context';
import useAuth from './Shared/hooks/auth-hook';
import LoadingSpinner from './Shared/components/UIElements/LoadingSpinner';

const Users = React.lazy(() => import('./Users/pages/Users'));
const UserPlaces = React.lazy(() => import('./Places/pages/UserPlaces'));
const NewPlace = React.lazy(() => import('./Places/pages/NewPlace'));
const UpdatePlace = React.lazy(() => import('./Places/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./Users/pages/Auth'));

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/ShareYourPlaces" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/ShareYourPlaces" exact>
          <Users />
        </Route>
        <Route path="/:userId/Places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
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
        logout: logout,
      }}
    >
      <React.Fragment>
        <Router basename="/ShareYourPlaces">
          <MainNavigation />
          <main>
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
        </Router>
      </React.Fragment>
    </AuthContext.Provider>
  );
};

export default App;

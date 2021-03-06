import { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './Components/Navigation/PrivateRoute';
import PublicRoute from './Components/Navigation/PublicRoute';

import Spinner from './Components/Spinner';
import Navigation from './Components/Navigation';
import HomePage from './Components/HomePage';
const ContactForm = lazy(() =>
  import('./Components/Form' /* webpackChunkName: "ContactForm"*/),
);
const ContactsList = lazy(() =>
  import('./Components/ContactsList' /* webpackChunkName: "ContactsList"*/),
);
const Register = lazy(() =>
  import('./Components/Register' /* webpackChunkName: "Register"*/),
);
const Login = lazy(() =>
  import('./Components/Login' /* webpackChunkName: "Login"*/),
);

const App = () => {
  return (
    <>
      <Navigation />

      <Suspense fallback={<Spinner />}>
        <Switch>
          <PublicRoute path="/" exact>
            <HomePage />
          </PublicRoute>

          <PrivateRoute path="/contacts">
            <ContactForm />
            <ContactsList />
          </PrivateRoute>

          <PublicRoute path="/login" redirectTo="/contacts" restricted>
            <Login />
          </PublicRoute>

          <PublicRoute path="/register" restricted>
            <Register />
          </PublicRoute>
        </Switch>
      </Suspense>
    </>
  );
};

export default App;

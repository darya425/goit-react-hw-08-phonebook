import { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './Components/Navigation/PrivateRoute';
import PublicRoute from './Components/Navigation/PublicRoute';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Navigation from './Components/Navigation';
import HomePage from './Components/HomePage';
const ContactForm = lazy(() =>
  import('./Components/Form' /* webpackChunkName: "ContactForm"*/),
);
const ContactsList = lazy(() =>
  import('./Components/ContactsList' /* webpackChunkName: "ContactsList"*/),
);
const AdminPage = lazy(() =>
  import('./Components/AdminPage' /* webpackChunkName: "AdminPage"*/),
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

      <Suspense
        fallback={
          <Loader type="Circles" color="#383838" height={100} width={100} />
        }
      >
        <Switch>
          <PublicRoute path="/" exact>
            <HomePage />
          </PublicRoute>

          <PrivateRoute path="/contacts">
            <ContactForm />
            <ContactsList />
          </PrivateRoute>

          <PrivateRoute path="/admin">
            <AdminPage />
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

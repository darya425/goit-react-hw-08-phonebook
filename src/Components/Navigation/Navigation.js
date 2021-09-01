import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query/react';
import {
  getIsLoggedIn,
  getUserName,
  getUserToken,
  setCurrentUser,
  removeCredetials,
} from '../../Redux/user/authSlice';
import {
  useFetchCurrentUserQuery,
  useLogoutUserMutation,
} from '../../Redux/user/userSlice';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn);
  const token = useSelector(getUserToken);
  const name = useSelector(getUserName);

  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const { data: currentUser } = useFetchCurrentUserQuery(token ?? skipToken);

  const isAdmin = name === 'admin';

  useEffect(() => {
    if (token === null) {
      return;
    }

    dispatch(setCurrentUser(currentUser));
  }, [dispatch, currentUser, token]);

  const handleSubmit = async () => {
    try {
      const result = await logoutUser();
      dispatch(removeCredetials(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSubmit = () => {
  //   const result = logoutUser();
  //   dispatch(removeCredetials(result.data));
  // };

  return (
    <div className="header">
      <Container>
        <Navbar expand="lg" bg="nav" variant="dark">
          <Navbar.Brand as={NavLink} to="/">
            Phonebook
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {isLoggedIn && (
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/contacts">
                  Contacts
                </Nav.Link>
                {isAdmin && (
                  <Nav.Link as={NavLink} to="/admin">
                    Admin
                  </Nav.Link>
                )}
              </Nav>
            )}
            {isLoggedIn ? (
              <Nav>
                <Navbar.Text className="nav-title">
                  Signed in as: <a href="/login">{name}</a>
                </Navbar.Text>
                <Button
                  type="button"
                  variant="light"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader
                      type="Circles"
                      color="#00BFFF"
                      height={15}
                      width={15}
                    />
                  ) : (
                    'Exit'
                  )}
                </Button>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link as={NavLink} to="/login">
                  Log in
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Log up
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default Navigation;

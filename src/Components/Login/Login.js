import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../../Redux/user/userSlice';
import { setCredentials } from '../../Redux/user/authSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Container, Form, Button } from 'react-bootstrap';

import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleInputName = e => {
    const { name, value } = e.target;

    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const result = await loginUser({ user })
        .unwrap()
        .then(payload => {
          toast.success('You are logged in!', { autoClose: 2000 });
          return payload;
        })
        .catch(() => {
          toast.error('Login canceled. Check your username or password', {
            autoClose: 2000,
          });
          reset();
        });
      if (result) {
        dispatch(setCredentials(result));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const reset = () => {
    setUser({
      email: '',
      password: '',
    });
  };

  return (
    <Container>
      <ToastContainer />
      <h2 className="login-title">Log in</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter email"
            onChange={handleInputName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleInputName}
          />
        </Form.Group>

        <Button variant="secondary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader type="Circles" color="#383838" height={15} width={15} />
          ) : (
            'Submit'
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

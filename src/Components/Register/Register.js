import { useState } from 'react';

import { useCreateUserMutation } from '../../Redux/user/userSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Container, Form, Button } from 'react-bootstrap';

import './Register.scss';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleInputName = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    createUser({ name, email, password })
      .unwrap()
      .then(payload => {
        console.log(payload);
        toast.success('You have registered!', { autoClose: 2000 });
      })
      .catch(error => {
        console.log(error);
        toast.error('Fuck YOU!', { autoClose: 2000 });
      });

    reset();
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      <ToastContainer />
      <h2 className="register-title">Registration form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name Surname</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            placeholder="Name Surname"
            onChange={handleInputName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleInputName}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleInputName}
          />
        </Form.Group>

        <Button variant="secondary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader type="Circles" color="#00BFFF" height={15} width={15} />
          ) : (
            'Submit'
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;

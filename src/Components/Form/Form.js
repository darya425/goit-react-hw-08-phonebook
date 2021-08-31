import { useState } from 'react';
import {
  useFetchContactsQuery,
  useCreateContactMutation,
} from '../../Redux/contact/contactSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Container, Form, Button } from 'react-bootstrap';

import './Form.scss';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [createContact, { isLoading }] = useCreateContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const handleInputName = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = name.toLowerCase();
    const savedContacts = contacts.find(
      contact => contact.name.toLowerCase() === newContact,
    );

    if (savedContacts) {
      alert(name + ' is already in contacts.');
      reset();
      return;
    }

    createContact({ name, number });
    toast.success('Contact added!', { autoClose: 2000 });

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <h1 className="title">Add new contact</h1>
        <Form
          className="form-contact"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              placeholder="Enter name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="You need to click on the letters"
              onChange={handleInputName}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="tel"
              name="number"
              value={number}
              placeholder="Enter number 666-666-6666..."
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              title="Do you know what a dash is?"
              onChange={handleInputName}
              required
            />
          </Form.Group>

          <Button variant="secondary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader type="Circles" color="#383838" height={15} width={15} />
            ) : (
              'Add contact'
            )}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ContactForm;

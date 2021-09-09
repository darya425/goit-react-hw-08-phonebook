import { useState } from 'react';
import {
  useFetchContactsQuery,
  useCreateContactMutation,
} from '../../Redux/contact/contactSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Container, Form, Button, Col, Row } from 'react-bootstrap';

import './Form.scss';

const ContactForm = () => {
  const [item, setItem] = useState({
    name: '',
    number: '',
  });

  const [createContact, { isLoading }] = useCreateContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const handleInputName = e => {
    const { name, value } = e.target;

    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = item.name.toLowerCase();
    const savedContacts = contacts.find(
      contact => contact.name.toLowerCase() === newContact,
    );

    if (savedContacts) {
      toast.error(`${item.name} is already in contacts.`, { autoClose: 2000 });
      reset();
      return;
    }

    createContact({ item });
    toast.success('Contact added!', { autoClose: 2000 });

    reset();
  };

  const reset = () => {
    setItem({
      name: '',
      number: '',
    });
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
          <Row className="align-items-center">
            <Col sm={5} className="my-2">
              <Form.Group className="mb-0" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={item.name}
                  placeholder="Enter name"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="You need to click on the letters"
                  onChange={handleInputName}
                  required
                />
              </Form.Group>
            </Col>

            <Col sm={5} className="my-2">
              <Form.Group className="mb-0" controlId="formBasicNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="number"
                  value={item.number}
                  placeholder="Enter number '666-666-6666'"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  title="Do you know what a dash is?"
                  onChange={handleInputName}
                  required
                />
              </Form.Group>
            </Col>

            <Col sm={2} className="my-2">
              <Button variant="secondary" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader
                    type="Circles"
                    color="#383838"
                    height={15}
                    width={15}
                  />
                ) : (
                  'Add contact'
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ContactForm;

import { useState, useEffect } from 'react';
import { useFetchContactsQuery } from '../../Redux/contact/contactSlice';
import Filter from '../Filter';
import Contact from '../Contact';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Container } from 'react-bootstrap';

import './ContactsList.scss';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const { data, isFetching } = useFetchContactsQuery();

  useEffect(() => {
    if (data) {
      setContacts(data);
    }
  }, [data]);

  const onFilterContacts = filter => {
    if (filter) {
      const normalizeFilter = filter.toLowerCase();
      const filterValue = contacts.filter(({ name }) =>
        name.toLowerCase().includes(normalizeFilter),
      );

      setContacts(filterValue);
    } else {
      setContacts(data);
    }
  };

  return (
    <Container>
      <h2 className="contact">Contacts</h2>
      <Filter filter={onFilterContacts} />
      {isFetching && (
        <Loader type="Circles" color="#383838" height={100} width={100} />
      )}
      {contacts && (
        <ul className="list">
          {contacts.map(contact => (
            <Contact key={contact.id} {...contact} />
          ))}
        </ul>
      )}
    </Container>
  );
};

export default ContactsList;

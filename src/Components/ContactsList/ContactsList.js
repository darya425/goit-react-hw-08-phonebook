import { useState, useEffect } from 'react';
import { useFetchContactsQuery } from '../../Redux/contact/contactSlice';
import Filter from '../Filter';
import Contact from '../Contact';
import Spinner from '../Spinner';

import { Container } from 'react-bootstrap';

import './ContactsList.scss';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const { data, isFetching } = useFetchContactsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

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
      {isFetching && <Spinner />}
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

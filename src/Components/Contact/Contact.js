import React from 'react';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from '../../Redux/contact/contactSlice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './Contact.scss';

const Contact = ({ id, name, number }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  return (
    <li className="item">
      <span className="name-item">{name}</span>
      <span className="name-item">{number}</span>
      <button
        className="btn-contact"
        type="button"
        onClick={() => {
          deleteContact(id);
          toast.success('Contact deleted!', { autoClose: 2000 });
        }}
        disabled={isDeleting}
      >
        {isDeleting && (
          <Loader type="Circles" color="#C8C8C8" height={15} width={15} />
        )}
      </button>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Contact;

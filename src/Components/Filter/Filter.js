import React from 'react';

import { Form, FormControl } from 'react-bootstrap';

import './Filter.scss';

const Filter = ({ filter }) => {
  const handleSubmit = e => {
    filter(e.currentTarget.value);
  };

  return (
    <Form className="d-flex filter-form">
      <Form.Label className="filter-title">Find contact by name :</Form.Label>
      <FormControl
        type="search"
        placeholder="Enter name"
        className="mr-2 filter-input"
        aria-label="Search"
        onChange={handleSubmit}
      />
    </Form>
  );
};

export default Filter;

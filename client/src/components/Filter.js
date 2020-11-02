import React from 'react';
import { Form } from 'react-bootstrap';
import { search } from '../helpers/search';
import { useHistory } from 'react-router-dom';

function Filter(props) {
  const history = useHistory();
  const filter = search.useQuery().get('filter') || '';
  const { addQuery } = search.useQueryBuilder();

  function handleChange(e) {
    history.push(
      history.location.pathname + '?' + addQuery('filter', e.target.value)
    );
  }

  return (
    <Form>
      <Form.Group controlId="select">
        <Form.Label>{props.name}</Form.Label>
        <Form.Control
          as="select"
          size="md"
          value={filter}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          {props.options.map((o, index) => (
            <option key={index} value={o.value}>
              {o.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
}

export default Filter;

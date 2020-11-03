import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { search } from '../helpers/search';

function Filter() {
  const [filter, setFilter] = useState(search.useQuery().get('name') || '');
  const debouncedSearchTerm = useDebounce(filter, 1000);
  const history = useHistory();
  const { addQuery } = search.useQueryBuilder();

  useEffect(() => {
    history.push(history.location.pathname + '?' + addQuery('name', filter));
  }, [debouncedSearchTerm]);

  return (
    <Form>
      <Form.Group controlId="name">
        <Form.Label>Filtruoti pagal vardą</Form.Label>
        <Form.Control
          type="text"
          value={filter}
          onChange={(e) => {e.preventDefault();
            setFilter(e.target.value);
          }}
        />
      </Form.Group>
    </Form>
  );
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default Filter;

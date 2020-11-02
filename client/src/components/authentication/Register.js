import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/authentication/action';
import { Form, Button, Spinner } from 'react-bootstrap';

function Register(props) {
  const [user, setUser] = useState({
    email: '',
    name: '',
    lastName: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function handleChange(e) {
    if (error) {
      setError('');
    }
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const promise = dispatch(register(user));
    setLoading(true);
    promise
      .then((res) => {
        setLoading(false);
        props.handleClose();
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
  }

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>El. pašto adresas</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => handleChange(e)}
          placeholder="Įveskite el. pašto adresą"
        />
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Vardas</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={user.name}
          onChange={(e) => handleChange(e)}
          placeholder="Įveskite vardą"
        />
      </Form.Group>

      <Form.Group controlId="formBasiclastName">
        <Form.Label>Pavardė</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={(e) => handleChange(e)}
          placeholder="Įveskite pavardę"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Slaptažodis</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => handleChange(e)}
          placeholder="Įveskite slaptažodį"
        />
        {error && <Form.Text style={{ color: 'red' }}>{error}</Form.Text>}
      </Form.Group>
      <Button variant="success" type="submit">
        Registruotis
      </Button>
      {loading && (
        <Spinner animation="border" role="status" style={{ marginLeft: '1em' }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </Form>
  );
}

export default Register;

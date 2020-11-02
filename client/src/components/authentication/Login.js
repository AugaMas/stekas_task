import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import { login } from '../../actions/authentication/action';

function Login(props) {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  function handleChange(e) {
    if (error) {
      setError('');
    }
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const promise = dispatch(login(userCredentials));
    promise
      .then((res) => {
        props.handleClose();
      })
      .catch((e) => {
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
          value={userCredentials.email}
          onChange={(e) => handleChange(e)}
          placeholder="Įveskite el. pašto adresą"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Slaptažodis</Form.Label>
        <Form.Control
          name="password"
          type="password"
          value={userCredentials.password}
          onChange={(e) => handleChange(e)}
          placeholder="Įveskite slaptažodį"
        />
        {error && <Form.Text style={{ color: 'red' }}>{error}</Form.Text>}
      </Form.Group>
      <Button variant="primary" type="submit">
        Prisijungti
      </Button>
      {auth.isLoggingIn && (
        <Spinner animation="border" role="status" style={{ marginLeft: '1em' }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </Form>
  );
}

export default Login;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userCredentials);
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
          type="password"
          name="password"
          value={userCredentials.password}
          onChange={(e) => handleChange(e)}
          placeholder="Įveskite slaptažodį"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Prisijungti
      </Button>
    </Form>
  );
}

export default Login;

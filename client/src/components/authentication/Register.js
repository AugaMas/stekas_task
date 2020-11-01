import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function Register() {
  const [user, setUser] = useState({
    email: '',
    name: '',
    lastName: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
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
      </Form.Group>
      <Button variant="success" type="submit">
        Registruotis
      </Button>
    </Form>
  );
}

export default Register;

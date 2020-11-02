import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import lt from 'date-fns/locale/lt';
import axios from 'axios';
import authService from '../../services/auth.service';

function OrderEdit() {
  const { id } = useParams();
  const auth = useSelector((store) => store.auth);
  const [order, setOrder] = useState({
    name: auth.user.user.name,
    lastName: auth.user.user.lastName,
    date: new Date(),
    products: [],
  });

  useEffect(() => {
    if (id !== 'new') {
      const config = authService.authorization();
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  }

  return (
    <Container>
      <h2 style={{ textAlign: 'center' }}>
        {id === 'new' ? 'Naujas užsakymas' : 'Redaguoti užsakymą'}
      </h2>
      <Form>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Vardas</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={order.name}
                onChange={(e) => handleChange(e)}
                placeholder="Įveskite vardą"
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group controlId="formBasiclastName">
              <Form.Label>Pavardė</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={order.lastName}
                onChange={(e) => handleChange(e)}
                placeholder="Įveskite pavardę"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6 }} sm={6}>
            <Form.Group controlId="formBasiclastName">
              <Form.Label>Atsiuntimo data</Form.Label>
              <div style={{ marginTop: '0.2em' }}>
                <DatePicker
                  selected={order.date}
                  onChange={(date) => setOrder({ ...order, date })}
                  locale={lt}
                  minDate={new Date()}
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={{ span: 2, offset: 2 }} sm={6}>
            <div style={{ marginTop: '1em' }}>
              <Button>Pridėti prekę</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default OrderEdit;

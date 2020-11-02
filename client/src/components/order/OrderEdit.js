import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import lt from 'date-fns/locale/lt';
import { format } from 'date-fns'
import axios from 'axios';
import authService from '../../services/auth.service';

function OrderEdit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const auth = useSelector((store) => store.auth);
  const [order, setOrder] = useState({
    name: auth.user.user.name,
    lastName: auth.user.user.lastName,
    date: new Date(),
    products: [],
  });

  useEffect(() => {
    const config = authService.authorization();
    if (id !== 'new') {
    setLoading(true)
    axios.get(`/api/order/${id}`, config).then(res => {
        setOrder({...res.data, date: new Date(res.data.date)})
        setLoading(false)
     })
    } else {
      setOrder({
        name: auth.user.user.name,
        lastName: auth.user.user.lastName,
        date: new Date(),
        products: [],
      })
    }
  }, [id, auth.user.user.name, auth.user.user.lastName]);

  function handleChange(e) {
    setError('');
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  }

  function prepareOrderObject(order) {
    return {...order, date: format(order.date, 'yyyy-MM-dd'), products: order.products.map(p => ({...p, count: +p.count}))}
  }

  function handleSubmit(e) {
    e.preventDefault();
    const config = authService.authorization();
    if(order.products.length) {
    if(id !== 'new') {
      axios.put(`/api/order/${id}`, prepareOrderObject(order), config).then(res => {
        history.push('/orders')
      }).catch(e => {
        setError(e.response.data.error);
      })
    }
    else {
      axios.post('/api/order/', prepareOrderObject(order), config).then(res => {
        
        history.push('/orders')
      }).catch(e => {
        setError(e.response.data.error);
      })
    }
  }
  else {
    setError(`Negalima ${id !== 'new' ? 'redaguoti' : 'pateikti'} užsakymą nepridėjus prekių`)
  }
  }

  return (
    <Container style={{ marginTop: '1em' }}>
      {loading ? 
      <div style={{ display: 'flex', height: '80vh', justifyContent: 'center' }}>
      <Spinner animation="border" role="status" style={{ alignSelf: 'center' }}>
         <span className="sr-only">Loading...</span>
      </Spinner>
    </div> :
      <>
      <h2 style={{ textAlign: 'center' }}>
        {id === 'new' ? 'Naujas užsakymas' : 'Redaguoti užsakymą'}
      </h2>
      <Form onSubmit={(e) => {handleSubmit(e)}}>
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
              <Form.Label>Pristatymo data</Form.Label>
              <div style={{ marginTop: '0.2em' }}>
                <DatePicker
                  selected={order.date}
                  onChange={(date) => {setOrder({ ...order, date }); setError('')}}
                  locale={lt}
                  minDate={new Date()}
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={{ span: 3, offset: 2 }} sm={6} style={{ display: 'flex' }}>
              <Button style={{ alignSelf: 'center' }} onClick={() => {setOrder({...order, products: [...order.products, { name: '', count: 0 }]}); setError('')}}>Pridėti prekę</Button>
          </Col>
        </Row>
        {order.products.length ?
          order.products.map((product, index) => <Row key={index}>
            <Col sm={6}>
            <Form.Group>
              <Form.Label>Prekės pavadinimas</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={order.products[index].name}
                onChange={(e) => {setOrder({...order, products: order.products.map((product, i) => {if(i === index) {
                  return {...product, name: e.target.value}
                }else {
                  return product
                }})})}}
                placeholder="Prekės pavadinimas"
              />
            </Form.Group>
            </Col>
            <Col sm={4}>
            <Form.Group>
              <Form.Label>Prekės kiekis</Form.Label>
              <Form.Control
                type="number"
                name="count"
                value={order.products[index].count}
                onChange={(e) => {setOrder({...order, products: order.products.map((product, i) => {if(i === index) {
                  return {...product, count: e.target.value < 0 ? 0 : e.target.value }
                } else {
                  return product
                }})})}}
                placeholder="Prekės kiekis"
              />
            </Form.Group>
            </Col>
            <Col sm={2} style={{ display: 'flex', justifyContent: 'center'}}>
            <Form.Group>
              <Form.Label>Pašalinti</Form.Label>
                <Button style={{ display: 'block' }} variant="outline-danger" onClick={() => {setOrder(
                  {...order, products: order.products.filter((p, i) => (i !== index))}
                  ); setError('')
                }}>X</Button>
              </Form.Group>
            </Col>
          </Row>) :
          <div style={{ textAlign: 'center', fontSize: '2em' }}>
            Prekių nėra
          </div>
        }
        {error && <Form.Text style={{ color: 'red', marginBottom: '0.5em' }}>{error}</Form.Text>}
        <Button type="submit" variant="outline-success">
          {(id !== 'new') ? 'Redaguoti užsakymą' : 'Pateikti užsakymą'}
        </Button>
      </Form>
      </>
}
    </Container>
  );
}

export default OrderEdit;

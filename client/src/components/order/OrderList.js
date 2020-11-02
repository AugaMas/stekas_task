import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../../services/auth.service';
import { useHistory } from 'react-router-dom';
import { Table, Container, Button } from 'react-bootstrap';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  function redirect(id) {
    history.push('/');
  }

  useEffect(() => {
    const config = authService.authorization();
    axios.get('/api/order/', config).then((res) => {
      setOrders(res.data);
    });
  }, []);
  return (
    <Container>
      <h2 style={{ textAlign: 'center' }}> Mano užsakymai</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>Data</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.lastName}</td>
              <td>{order.date}</td>
              <td style={{ textAlign: 'center' }}>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    redirect(order._id);
                  }}
                >
                  Redaguoti
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default OrderList;

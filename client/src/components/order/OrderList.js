import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../../services/auth.service';

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const config = authService.authorization();
    console.log(config);
    axios.get('/api/order/', config).then((res) => {
      console.log(res);
    });
  }, []);
  return <div>Order</div>;
}

export default Order;

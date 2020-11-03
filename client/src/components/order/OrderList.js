import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../../services/auth.service';
import { useHistory } from 'react-router-dom';
import { Table, Container, Button, Spinner } from 'react-bootstrap';
import { search } from '../../helpers/search';
import Pagination from '../Pagination';
import ItemsPerPageSelect from '../ItemsPerPageSelect';
import SortSelect from '../SortSelect';
import { format } from 'date-fns';
import Filter from '../Filter';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ordersCount, setOrdersCount] = useState(0);
  const history = useHistory();
  const page = search.useQuery().get('page') || 1;
  const { addQuery } = search.useQueryBuilder();
  const itemsPerPage = search.useQuery().get('size') || 10;
  const filter = search.useQuery().get('filter');
  const name = search.useQuery().get('name');

  function redirect(id) {
    history.push(`/order/${id}`);
  }

  useEffect(() => {
    const config = authService.authorization();
    addQuery('size', itemsPerPage);
    addQuery('name', name);
    const query = addQuery('page', page);
    setLoading(true);
    axios.get(`/api/order/?${query}`, config).then((res) => {
      setLoading(false);
      setOrdersCount(+res.headers['x-total-count']);
      setOrders(res.data);
    });
  }, [itemsPerPage, page, filter, name]);

  return (
    <Container>
      <h2 style={{ textAlign: 'center' }}> Mano užsakymai</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Filter />
      </div>
      {loading ? (
        <div
          style={{ display: 'flex', height: '20vh', justifyContent: 'center' }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ alignSelf: 'center' }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {ordersCount ? (
            <>
              {' '}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ marginRight: '2em', alignSelf: 'flex-end' }}>
                  <SortSelect
                    options={[
                      { label: 'Nepasirinkta', value: '' },
                      { label: 'Didėjant pagal datą', value: 'date' },
                      { label: 'Mažėjant pagal datą', value: '-date' },
                      { label: 'Didėjant pagal vardą', value: 'name' },
                      { label: 'Mažėjant pagal vardą', value: '-name' },
                    ]}
                    name="Rūšiuoti"
                  />
                </div>
                <div>
                  <ItemsPerPageSelect
                    options={[
                      { label: '10', value: 10 },
                      { label: '6', value: 6 },
                      { label: '1', value: 1 },
                    ]}
                    name="Rodomų užsakymų skaičius"
                  />
                </div>
              </div>
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
                      <td>{format(new Date(order.date), 'yyyy-MM-dd')}</td>
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
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  pagesCount={Math.ceil(ordersCount / (itemsPerPage || 1))}
                  selectedPage={+page}
                />
              </div>{' '}
            </>
          ) : (
            <div
              style={{ textAlign: 'center', fontSize: '2em', marginTop: '5em' }}
            >
              Nėra užsakymų
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default OrderList;

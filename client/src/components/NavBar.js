import React, { useState } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal';
import Login from './authentication/Login';
import { Link } from 'react-router-dom';
import { logout } from '../actions/authentication/action';
import Register from './authentication/Register';

function NavigationBar() {
  const [modal, setModal] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  function handleClose() {
    setModal('');
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          Stekas Užduotis
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {auth.isLoggedIn && (
            <Nav>
              <Nav.Link as={Link} to="/orders">
                Mano užsakymai
              </Nav.Link>
              <Nav.Link as={Link} to="/order/new">
                Naujas užsakymas
              </Nav.Link>
            </Nav>
          )}
          {auth.isLoggedIn ? (
            <Form inline className="ml-auto">
              <Button
                variant="outline-danger"
                onClick={() => {
                  dispatch(logout());
                }}
                style={{ marginRight: '0.5em' }}
              >
                Atsijungti
              </Button>
            </Form>
          ) : (
            <Form inline className="ml-auto">
              <Button
                variant="outline-success"
                onClick={() => setModal('register')}
                style={{ marginRight: '0.5em' }}
              >
                Registruotis
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => setModal('login')}
              >
                Prisijungti
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>

      <Modal
        handleClose={handleClose}
        show={!!modal}
        title={modal === 'login' ? 'Prisijungimas' : 'Registracija'}
      >
        {modal === 'login' && <Login handleClose={handleClose} />}
        {modal === 'register' && <Register handleClose={handleClose} />}
      </Modal>
    </>
  );
}

export default NavigationBar;

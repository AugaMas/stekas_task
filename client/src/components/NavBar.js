import React, { useState } from 'react';
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import Modal from './Modal';
import Login from './authentication/Login';
import Register from './authentication/Register';

function NavigationBar() {
  const [modal, setModal] = useState('');

  function handleClose() {
    setModal('');
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Stekas Užduotis</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
          <Form inline className="ml-auto">
            <Button
              variant="outline-success"
              onClick={() => setModal('register')}
              style={{ marginRight: '0.5em' }}
            >
              Registruotis
            </Button>
            <Button variant="outline-primary" onClick={() => setModal('login')}>
              Prisijungti
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Modal
        handleClose={handleClose}
        show={!!modal}
        title={modal === 'login' ? 'Prisijungimas' : 'Registracija'}
      >
        {modal && modal === 'login' ? <Login /> : <Register />}
      </Modal>
    </>
  );
}

export default NavigationBar;

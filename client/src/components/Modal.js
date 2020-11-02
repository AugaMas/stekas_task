import React from 'react';
import { Modal as M } from 'react-bootstrap';

function Modal(props) {
  return (
    <M show={props.show} onHide={props.handleClose}>
      <M.Header closeButton>
        <M.Title>{props.title}</M.Title>
      </M.Header>
      <M.Body>{props.children}</M.Body>
    </M>
  );
}

export default Modal;

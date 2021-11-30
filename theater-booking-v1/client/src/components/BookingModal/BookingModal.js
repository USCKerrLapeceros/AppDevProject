import React from "react";
import { Modal, Button } from "react-bootstrap";

const BookingModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant={props.variant || "primary"} onClick={props.handleSubmit}>
          {props.submitText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;

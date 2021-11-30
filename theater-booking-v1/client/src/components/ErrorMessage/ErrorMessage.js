import React from "react";
import Alert from "react-bootstrap/Alert";
import "./ErrorMessage.css";

const ErrorMessage = (props) => {
  return (
    <Alert className="alert" variant={props.type} onClose={props.onClose} dismissible>
      <Alert.Heading>{props.title}</Alert.Heading>
      <hr />
      {props.message}
    </Alert>
  );
};

export default ErrorMessage;

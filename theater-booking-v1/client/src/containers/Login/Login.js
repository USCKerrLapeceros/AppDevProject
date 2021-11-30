import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { useAppContext } from "../../lib/AuthContext";
import { useHistory } from "react-router-dom";
import { errorMessage } from "../../lib/Error";
import { useFormFields } from "../../lib/CustomHooks";
import { API_URL } from "../../lib/Constants";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";

export default function Login() {
  const { setIsAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  const history = useHistory();

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  };


  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      return Axios.post(API_URL + "login", {
        email: fields.email,
        password: fields.password,
      }).then((response) => {
        if (0 < response.data.length) {
          setIsAuthenticated(true);
          sessionStorage.setItem("user", response.data[0].UserEmail);
          sessionStorage.setItem("userId", response.data[0].UserID);
          history.push("/dashboard");
        } else {
          toast.error(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setIsLoading(false);
      });
    } catch (e) {
      errorMessage(e.message);
    }
  }

  return (
    <div className="Login">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}

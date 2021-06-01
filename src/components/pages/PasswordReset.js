import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import SignUp from "./SignUp";

function PasswordReset(props) {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      setError("");
      await resetPassword(emailRef.current.value);
      setResponse("Password link sent to your email!");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="w-80" style={{ minWidth: "400px" }}>
      <Card className="mt-5">
        <Card.Body>
          <h2>Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {response && <Alert variant="info">{response}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {/* <div className="w-100 text-center mt-2">
        Need and account? <Link to="/signup">Sign Up</Link>
      </div> */}
      <div className="w-100 text-center mt-2">
        <Link to="/login">Log In</Link> to your account.
      </div>
    </div>
  );
}

export default PasswordReset;

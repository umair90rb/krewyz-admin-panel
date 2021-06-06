import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBAlert,
} from "mdbreact";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { login, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      setError("");

      var admin = await axios.get(`/admin/${email}/${pass}`);
      console.log(admin);

      if (admin.data === false) {
        setError("You are not admin!");
        setLoading(false);
      } else if (admin.data === true) {
        await login(email, pass);
        setLoading(false);
        return history.push("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form onSubmit={handleSubmit}>
            <p className="h5 text-center mb-4">Sign in</p>
            {error && <MDBAlert color="danger">{error}</MDBAlert>}

            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                onChange={(e) => setEmail(e.target.value)}
                success="right"
                required={true}
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                onChange={(e) => setPass(e.target.value)}
                validate
                required={true}
              />
            </div>
            <div className="text-center">
              <MDBBtn
                disabled={loading}
                type="submit"
                color="warning"
                className="w-100"
              >
                Login
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;

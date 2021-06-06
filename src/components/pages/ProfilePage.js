import React, { useState } from "react";
import {
  MDBCard,
  MDBCol,
  MDBRow,
  MDBView,
  MDBMask,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn,
  MDBIcon,
  MDBAlert,
} from "mdbreact";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { currentUser, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    setLoading(true);
    resetPassword(currentUser.email).then(() => {
      setMessage("Password reset link sent to your email.");
      setLoading(false);
    });
  };
  return (
    <React.Fragment>
      <MDBRow className="justify-content-center">
        <MDBCol md="6" className="mb-5">
          {message !== "" && <MDBAlert>{message}</MDBAlert>}
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle className="text-center mb-2 font-bold">
                {currentUser.email}
              </MDBCardTitle>
              <MDBCardTitle
                sub
                className="text-center indigo-text mb-2 font-bold"
              >
                Admin
              </MDBCardTitle>
              <div className="row justify-content-center">
                <MDBBtn
                  size="md"
                  disabled={loading}
                  outline
                  color="warning"
                  onClick={handleReset}
                >
                  Update Password {loading && <MDBIcon icon="spinner" spin />}
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </React.Fragment>
  );
};

export default ProfilePage;

import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBFormInline,
  MDBBtn,
} from "mdbreact";
import { useAuth } from "./../../../context/AuthContext";
import { useHistory } from "react-router-dom";

const BreadcrumSection = () => {
  const { logout } = useAuth();
  const history = useHistory();
  console.log(history);
  return (
    <MDBCard className="mb-5">
      <MDBCardBody
        id="breadcrumb"
        className="d-flex align-items-center justify-content-between"
      >
        <MDBBreadcrumb>
          <MDBBreadcrumbItem active>
            {history.location.pathname == "/" && "Dashboard"}
          </MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <MDBFormInline className="md-form m-0">
          <MDBBtn onClick={logout} color="warning" className="my-0">
            <MDBIcon icon="sign-out-alt" /> Logout
          </MDBBtn>
        </MDBFormInline>
      </MDBCardBody>
    </MDBCard>
  );
};

export default BreadcrumSection;

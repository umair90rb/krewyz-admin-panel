import React from "react";
import { NavLink } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCardText,
} from "mdbreact";
import { useData } from "./../../../context/DataContext";

const AdminCardSection1 = () => {
  const {
    users,
    forums,
    listing,
    city,
    eating,
    doing,
    seeing,
    shopping,
  } = useData();
  return (
    <>
      <MDBRow className="mb-4">
        <MDBCol xl="4" md="6" className="mb-r">
          <NavLink to="/users">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="users" className="primary-color" />
                <div className="data">
                  <p>Users</p>
                  <h4>
                    <strong>{users.length}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <MDBCardText>No of total Users</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </NavLink>
        </MDBCol>
        <MDBCol xl="4" md="6" className="mb-r">
          <NavLink to="/forums">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="clipboard-list" className="warning-color" />
                <div className="data">
                  <p>Forums</p>
                  <h4>
                    <strong>{forums.length + city.length}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <MDBCardText>No of total Forums</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </NavLink>
        </MDBCol>
        <MDBCol xl="4" md="6" className="mb-r">
          <NavLink to="/listing">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="list-ol" className="light-blue lighten-1" />
                <div className="data">
                  <p>Listing</p>
                  <h4>
                    <strong>
                      {eating.length +
                        doing.length +
                        seeing.length +
                        shopping.length}
                    </strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <MDBCardText>No of total Listings</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </NavLink>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-5 mb-4">
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="cookie-bite" className="primary-color" />
              <div className="data">
                <p>Eat</p>
                <h4>
                  <strong>{eating.length}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <MDBCardText>No of total Listing[Eat]</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="check-circle" className="warning-color" />
              <div className="data">
                <p>Do</p>
                <h4>
                  <strong>{doing.length}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <MDBCardText>No of total Listing[Do]</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="eye" className="light-blue lighten-1" />
              <div className="data">
                <p>See</p>
                <h4>
                  <strong>{seeing.length}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <MDBCardText>No of total Listing[See]</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="shopping-bag" className="red accent-2" />
              <div className="data">
                <p>Shop</p>
                <h4>
                  <strong>{shopping.length}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <MDBCardText>No of total Listing[Shop]</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default AdminCardSection1;

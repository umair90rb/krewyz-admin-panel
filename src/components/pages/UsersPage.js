import React, { useState } from "react";
import { useData } from "./../../context/DataContext";
import { useAuth } from "./../../context/AuthContext";
import {
  MDBRow,
  MDBCol,
  MDBView,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
} from "mdbreact";
import axios from "axios";
import { secondaryAuth } from "./../../firebase";

const UsersPage = () => {
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState();
  const { users, deleteElement, updateElement, addElement } = useData();
  const [fileUploading, setFileUploading] = useState(false);

  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [airline, setAirline] = useState();
  const [address, setAddress] = useState();
  const [url, setUrl] = useState();
  const [em, setEm] = useState();
  const [pwd, setPwd] = useState();

  async function handleDelete(user) {
    console.log(user._id);
    deleteElement(users, user);
    setRefresh(refresh + 1);
    const result = await axios.delete(`/users/${user._id}`);
    console.log(result.data);
  }

  async function addUser() {
    setLoading(true);

    secondaryAuth.createUserWithEmailAndPassword(em, pwd).then(async () => {
      const result = await axios
        .post(`/users`, {
          _id: secondaryAuth.currentUser.uid,
          email: secondaryAuth.currentUser.email,
          firstName: first,
          lastName: last,
          imageUrl: url,
          airlineName: airline,
          address: address,
        })
        .catch((e) => {
          setLoading(false);
          return;
        });
      addElement(users, result.data);
      secondaryAuth.signOut();
      setLoading(false);
      setRefresh(refresh + 1);
      setModal(false);
    });
  }

  async function updateUser() {
    console.log(edit._id);
    setLoading(true);
    const result = await axios
      .put(`/users/${edit._id}`, {
        firstName: first,
        lastName: last,
        imageUrl: url,
        airlineName: airline,
        address: address,
      })
      .catch((e) => {
        setLoading(false);
        return;
      });
    updateElement(users, edit, result.data);
    console.log(result.data);
    setLoading(false);
    setRefresh(refresh + 1);
    setModal(false);
  }

  const table = users.map((user) => (
    <tr key={user._id}>
      <td>{user.email}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>
        <MDBBtn
          onClick={() => handleDelete(user)}
          rounded
          size="sm"
          color="danger"
        >
          <MDBIcon icon="trash" />
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            setEdit(user);
            setFirst(user.firstName);
            setLast(user.lastName);
            setAirline(user.airlineName);
            setAddress(user.address);
            setUrl(user.imageUrl);
            setModal(true);
          }}
          rounded
          size="sm"
          color="primary"
        >
          <MDBIcon icon="edit" />
        </MDBBtn>
      </td>
    </tr>
  ));
  return (
    <MDBRow>
      <MDBContainer>
        <MDBModal isOpen={modal}>
          <MDBModalHeader>
            {edit != null && "Update User (" + edit.email + ")"}
            {edit == null && "Add New User"}
          </MDBModalHeader>
          <MDBModalBody>
            <div className="grey-text">
              {edit == null && (
                <div>
                  <MDBInput
                    label="Email"
                    icon="envelope"
                    group
                    type="text"
                    onChange={(e) => setEm(e.target.value)}
                    value={em}
                  />
                  <MDBInput
                    label="Password"
                    icon="lock"
                    group
                    type="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                  />
                </div>
              )}
              <MDBInput
                label="First Name"
                icon="user"
                group
                type="text"
                onChange={(e) => setFirst(e.target.value)}
                value={first}
              />
              <MDBInput
                label="Last Name"
                icon="edit"
                group
                type="text"
                onChange={(e) => setLast(e.target.value)}
                value={last}
              />
              <MDBInput
                label="Airline Name"
                icon="edit"
                group
                type="text"
                onChange={(e) => setAirline(e.target.value)}
                value={airline}
              />
              <MDBInput
                label="Address"
                icon="map"
                group
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">
                    {fileUploading ? (
                      <MDBIcon icon="spinner" spin />
                    ) : (
                      "Select to Upload"
                    )}
                  </span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={async (e) => {
                      if (e.target.files.length === 0) return;
                      setFileUploading(true);
                      console.log(e.target.files.length);
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      const config = {
                        headers: {
                          "content-type": "multipart/form-data",
                        },
                      };
                      const result = await axios.post(
                        "/files/upload",
                        formData,
                        config
                      );
                      console.log(result.data);
                      setUrl(result.data);
                      setFileUploading(false);
                    }}
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    Choose file
                  </label>
                </div>
              </div>

              <MDBInput
                label="Image URL"
                icon="edit"
                onChange={(e) => setUrl(e.target.value)}
                group
                type="text"
                value={url}
              />
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" size="sm" onClick={() => setModal(false)}>
              Close
            </MDBBtn>
            <MDBBtn
              onClick={edit == null ? () => addUser() : () => updateUser()}
              disabled={loading}
              size="sm"
              color="primary"
            >
              Save changes {loading && <MDBIcon icon="spinner" spin />}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      <MDBCol md="12" middle={true}>
        <MDBBtn
          size="md"
          onClick={() => {
            setEdit();
            setFirst();
            setLast();
            setAirline();
            setAddress();
            setUrl();
            setModal(true);
          }}
        >
          <MDBIcon icon="plus" /> Add New User
        </MDBBtn>
      </MDBCol>
      <MDBCol md="12">
        <MDBCard className="mt-5">
          <MDBView className="gradient-card-header blue darken-2">
            <h4 className="h4-responsive text-white">USERS</h4>
          </MDBView>
          <MDBCardBody>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th>Email</th>
                  <th>First</th>
                  <th>Last</th>
                  <th>Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>{table}</MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default UsersPage;

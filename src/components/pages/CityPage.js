import React, { useState } from "react";
import { useData } from "./../../context/DataContext";
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

const CityPage = () => {
  const { cities, addElement, updateElement, deleteElement } = useData();
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);

  const [forumType, setForumType] = useState("");
  const [edit, setEdit] = useState();

  const [modal, setModal] = useState(false);

  const [city, setCity] = useState();

  async function handleDeleteCity(element) {
    deleteElement(cities, element);
    setRefresh(refresh + 1);
    const result = await axios.delete(`/cities/${element._id}`);
    console.log(result.data);
  }

  async function addCity() {
    setLoading(true);
    const result = await axios
      .post(`/cities`, {
        city: city,
      })
      .catch((e) => {
        setLoading(false);
        return;
      });
    addElement(cities, result.data);
    setLoading(false);
    setRefresh(refresh + 1);
    setModal(false);
  }

  async function updateCity() {
    setLoading(true);
    const result = await axios
      .put(`/cities/${edit._id}`, {
        city: city,
      })
      .catch((e) => {
        setLoading(false);
        return;
      });
    updateElement(cities, edit, result.data);
    setLoading(false);
    setRefresh(refresh + 1);
    setModal(false);
  }

  const cityTable = cities.map((element) => (
    <tr key={element._id}>
      <td>{element.city}</td>
      <td>{element.at}</td>
      <td>
        <MDBBtn
          onClick={() => handleDeleteCity(element)}
          rounded
          size="sm"
          color="danger"
        >
          <MDBIcon icon="trash" />
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            setEdit(element);
            setCity(element.city);
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
            {edit != null && "Update City"}
            {edit == null && "Add New City"}
          </MDBModalHeader>
          <MDBModalBody>
            <div className="grey-text">
              <MDBInput
                label="City"
                group
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" size="sm" onClick={() => setModal(false)}>
              Close
            </MDBBtn>
            <MDBBtn
              onClick={edit == null ? () => addCity() : () => updateCity()}
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
            setCity();
            setModal(true);
          }}
        >
          <MDBIcon icon="plus" /> Add New City
        </MDBBtn>
      </MDBCol>
      <MDBCol md="12">
        <MDBCard className="mt-5">
          <MDBView className="gradient-card-header blue darken-2">
            <h4 className="h4-responsive text-white">Forums</h4>
          </MDBView>
          <MDBCardBody>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th>City</th>
                  <th>Created On</th>
                  <th>Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>{cityTable}</MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default CityPage;

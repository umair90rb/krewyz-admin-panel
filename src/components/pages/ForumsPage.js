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

const ForumsPage = () => {
  const [refresh, setRefresh] = useState(0);
  const {
    forums,
    cities,
    city,
    addElement,
    updateElement,
    deleteElement,
  } = useData();
  const [loading, setLoading] = useState(false);

  const [forumType, setForumType] = useState("");
  const [edit, setEdit] = useState();

  const [modal, setModal] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);

  const [createdBy, setCreatedBy] = useState();
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [cityInput, setCityInput] = useState();
  const [heading, setHeading] = useState();
  const [image, setImage] = useState();

  async function handleDeleteFourms(element) {
    deleteElement(forums, element);
    setRefresh(refresh + 1);
    const result = await axios.delete(`/forums/${element._id}`);
    console.log(result.data);
  }

  async function handleDeleteCity(element) {
    deleteElement(city, element);
    setRefresh(refresh + 1);
    const result = await axios.delete(`/city/${element._id}`);
    console.log(result.data);
  }

  async function addForums() {
    setLoading(true);
    if (forumType === "forum") {
      const result = await axios
        .post(`/forums`, {
          createdBy: createdBy,
          description: description,
          title: title,
        })
        .catch((e) => {
          setLoading(false);
          return;
        });
      addElement(forums, result.data);
    } else if (forumType === "city") {
      const result = await axios
        .post(`/city`, {
          createdBy: createdBy,
          description: description,
          title: title,
          city: cityInput,
          mainHeading: heading,
          mainImageUrl: image,
        })
        .catch((e) => {
          setLoading(false);
          return;
        });
      addElement(city, result.data);
    }
    setLoading(false);
    setRefresh(refresh + 1);
    setModal(false);
  }

  async function updateForums() {
    setLoading(true);
    if (forumType === "forum") {
      const result = await axios
        .put(`/forums/${edit._id}`, {
          createdBy: createdBy,
          description: description,
          title: title,
        })
        .catch((e) => {
          setLoading(false);
          return;
        });
      updateElement(forums, edit, result.data);
    } else if (forumType === "city") {
      const result = await axios
        .put(`/city/${edit._id}`, {
          createdBy: createdBy,
          description: description,
          title: title,
          city: cityInput,
          mainHeading: heading,
          mainImageUrl: image,
        })
        .catch((e) => {
          setLoading(false);
          return;
        });
      updateElement(city, edit, result.data);
    }
    setLoading(false);
    setRefresh(refresh + 1);
    setModal(false);
  }

  const fourmsTable = forums.map((element) => (
    <tr key={element._id}>
      <td>{element.title}</td>
      <td>{element.description}</td>
      <td>{element.createdOn}</td>
      <td>
        <MDBBtn
          onClick={() => handleDeleteFourms(element)}
          rounded
          size="sm"
          color="danger"
        >
          <MDBIcon icon="trash" />
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            setEdit(element);
            setTitle(element.title);
            setDescription(element.description);
            setCreatedBy(element.createdBy);
            setForumType("forum");
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

  const cityTable = city.map((element) => (
    <tr key={element._id}>
      <td>{element.title}</td>
      <td>{element.description}</td>
      <td>{element.createdOn}</td>
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
            setTitle(element.title);
            setDescription(element.description);
            setCreatedBy(element.createdBy);
            setCityInput(element.city);
            setHeading(element.mainHeading);
            setImage(element.mainImageUrl);
            setForumType("city");
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
  console.log(axios.defaults.baseURL);
  return (
    <MDBRow>
      <MDBContainer>
        <MDBModal isOpen={modal}>
          <MDBModalHeader>
            {forumType != null && "Update Forums"}
            {edit == null && "Add New Forums"}
          </MDBModalHeader>
          <MDBModalBody>
            <div className="grey-text">
              <MDBInput
                label="Title"
                group
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <MDBInput
                label="Description"
                group
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <MDBInput
                label="Created By"
                group
                type="text"
                onChange={(e) => setCreatedBy(e.target.value)}
                value={createdBy}
              />
              {forumType == "city" && (
                <>
                  <MDBInput
                    label="Heading"
                    group
                    type="text"
                    onChange={(e) => setHeading(e.target.value)}
                    value={heading}
                  />
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">
                      Select City
                    </label>
                    <select
                      onChange={(e) => {
                        setCityInput(e.target.value);
                      }}
                      defaultValue={cityInput}
                      className="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option value="">Select City</option>
                      {cities.map((c) => (
                        <option key={c._id} value={c.city}>
                          {c.city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroupFileAddon01"
                      >
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
                          setImage(result.data);
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
                    onChange={(e) => setImage(e.target.value)}
                    group
                    type="text"
                    value={image}
                  />
                </>
              )}
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" size="sm" onClick={() => setModal(false)}>
              Close
            </MDBBtn>
            <MDBBtn
              onClick={edit == null ? () => addForums() : () => updateForums()}
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
            setForumType("forum");
            setCreatedBy();
            setTitle();
            setDescription();
            setModal(true);
          }}
        >
          <MDBIcon icon="plus" /> Add New Forum
        </MDBBtn>

        <MDBBtn
          size="md"
          onClick={() => {
            setEdit();
            setForumType("city");
            setCreatedBy();
            setTitle();
            setDescription();
            setHeading();
            setImage();
            setModal(true);
          }}
        >
          <MDBIcon icon="plus" /> Add New City Forums
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
                  <th>Title</th>
                  <th>Description</th>
                  <th>Created On</th>
                  <th>Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {cityTable}
                {fourmsTable}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default ForumsPage;

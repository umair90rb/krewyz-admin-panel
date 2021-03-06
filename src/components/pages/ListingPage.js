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
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBContainer,
  MDBBtnGroup,
} from "mdbreact";
import axios from "axios";
import MapsPage from "./MapsPage";
import Geocode from "react-geocode";
import TimePicker from "react-times";
import "react-times/css/material/default.css";

Geocode.setApiKey("AIzaSyBcIEZn73crG94pPjGaislJtO3L6wNDfH8");

function ListingPage() {
  const [refresh, setRefresh] = useState(0);
  const {
    eating,
    doing,
    seeing,
    shopping,
    listing,
    addElement,
    updateElement,
    deleteElement,
  } = useData();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState();
  const [modal, setModal] = useState(false);

  const [map, setMap] = useState(false);

  const [createdBy, setCreatedBy] = useState();
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const [category, setCategory] = useState();
  const [endTime, setEndTime] = useState();
  const [startTime, setStartTime] = useState();
  const [url, setUrl] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [name, setName] = useState();
  let [urls, setUrls] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [cat, setCat] = useState(["Eat", "Do", "See", "Shop"]);
  const [cc, setCc] = useState(null);

  const categories = ["Eat", "Do", "See", "Shop"];

  const [others, setOthers] = useState(false);

  async function handleDelete(element, arr) {
    console.log(element._id);
    deleteElement(arr, element);
    setRefresh(refresh + 1);
    const result = await axios.delete(`/listing/${element._id}`);
    console.log(result.data);
  }

  async function addListing() {
    setLoading(true);
    const result = await axios
      .post(`/listing`, {
        createdBy: createdBy,
        description: description,
        address: address,
        category: category,
        endTime: endTime,
        startTime: startTime,
        mainImageUrl: url,
        latitude: lat,
        longitude: lng,
        name: name,
        otherImages: urls,
      })
      .catch((e) => {
        setLoading(false);
        return;
      });
    if (category === "Eat") addElement(eating, result.data);
    if (category === "Do") addElement(doing, result.data);
    if (category === "See") addElement(seeing, result.data);
    if (category === "Shop") addElement(shopping, result.data);
    addElement(listing, result.data);
    setLoading(false);
    setRefresh(refresh + 1);
    setModal(false);
  }

  async function updateListing() {
    setLoading(true);
    const result = await axios
      .put(`/listing/${edit._id}`, {
        createdBy: createdBy,
        description: description,
        address: address,
        category: category,
        endTime: endTime,
        startTime: startTime,
        mainImageUrl: url,
        latitude: lat,
        longitude: lng,
        name: name,
        otherImages: urls,
      })
      .catch((e) => {
        setLoading(false);
        return;
      });
    if (category === "Eat") updateElement(eating, edit, result.data);
    if (category === "Do") updateElement(doing, edit, result.data);
    if (category === "See") updateElement(seeing, edit, result.data);
    if (category === "Shop") updateElement(shopping, edit, result.data);
    updateElement(listing, edit, result.data);
    setLoading(false);
    setRefresh(refresh + 1);
    setModal(false);
  }

  function pickAddress({ lat, lng }) {
    setLat(lat);
    setLng(lng);
    setLoading(true);
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
        setAddress(address);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setAddress("");
        setLoading(false);
      }
    );
  }

  const eatingTable = eating.map((element) => (
    <tr key={element._id}>
      <td>{element.name}</td>
      <td>{element.description}</td>
      <td>{element.category}</td>
      <td>
        <MDBBtn
          onClick={() => handleDelete(element, eating)}
          rounded
          size="sm"
          color="danger"
        >
          <MDBIcon icon="trash" />
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            setEdit(element);
            setCreatedBy(element.createdBy);
            setDescription(element.description);
            setAddress(element.address);
            setName(element.name);
            setCategory(element.category);
            setUrl(element.mainImageUrl);
            setUrls(element.otherImages);
            setStartTime(element.startTime);
            setEndTime(element.endTime);
            setLat(element.latitude);
            setLng(element.longitude);
            setModal(true);
          }}
          rounded
          size="sm"
          color="warning"
        >
          <MDBIcon icon="edit" />
        </MDBBtn>
      </td>
    </tr>
  ));

  const doingTable = doing.map((element) => (
    <tr key={element._id}>
      <td>{element.name}</td>
      <td>{element.description}</td>
      <td>{element.category}</td>
      <td>
        <MDBBtn
          onClick={() => handleDelete(element, doing)}
          rounded
          size="sm"
          color="danger"
        >
          <MDBIcon icon="trash" />
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            setEdit(element);
            setCreatedBy(element.createdBy);
            setDescription(element.description);
            setAddress(element.address);
            setName(element.name);
            setCategory(element.category);
            setUrl(element.mainImageUrl);
            setUrls(element.otherImages);
            setStartTime(element.startTime);
            setEndTime(element.endTime);
            setLat(element.latitude);
            setLng(element.longitude);
            setModal(true);
          }}
          rounded
          size="sm"
          color="warning"
        >
          <MDBIcon icon="edit" />
        </MDBBtn>
      </td>
    </tr>
  ));

  const seeingTable = seeing.map((element) => (
    <tr key={element._id}>
      <td>{element.name}</td>
      <td>{element.description}</td>
      <td>{element.category}</td>
      <td>
        <MDBBtn
          onClick={() => handleDelete(element, seeing)}
          rounded
          size="sm"
          color="danger"
        >
          <MDBIcon icon="trash" />
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            setEdit(element);
            setCreatedBy(element.createdBy);
            setDescription(element.description);
            setAddress(element.address);
            setName(element.name);
            setCategory(element.category);
            setUrl(element.mainImageUrl);
            setUrls(element.otherImages);
            setStartTime(element.startTime);
            setEndTime(element.endTime);
            setLat(element.latitude);
            setLng(element.longitude);
            setModal(true);
          }}
          rounded
          size="sm"
          color="warning"
        >
          <MDBIcon icon="edit" />
        </MDBBtn>
      </td>
    </tr>
  ));

  const shoppingTable = shopping.map((element) => (
    <tr key={element._id}>
      <td>{element.name}</td>
      <td>{element.description}</td>
      <td>{element.category}</td>
      <td>
        <MDBBtn
          onClick={() => handleDelete(element, shopping)}
          rounded
          size="sm"
          color="danger"
        >
          <MDBIcon icon="trash" />
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            setEdit(element);
            setCreatedBy(element.createdBy);
            setDescription(element.description);
            setAddress(element.address);
            setName(element.name);
            setCategory(element.category);
            setUrl(element.mainImageUrl);
            setUrls(element.otherImages);
            setStartTime(element.startTime);
            setEndTime(element.endTime);
            setLat(element.latitude);
            setLng(element.longitude);
            setModal(true);
          }}
          rounded
          size="sm"
          color="warning"
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
            {edit != null && "Update Listing"}
            {edit == null && "Add New Listing"}
          </MDBModalHeader>
          <MDBModalBody>
            <div className="grey-text">
              <MDBInput
                label="Name"
                group
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
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
              <MDBRow>
                <MDBCol md="8">
                  <MDBInput
                    label="Address"
                    group
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </MDBCol>
                <MDBCol>
                  <MDBBtn
                    size="sm"
                    color="warning"
                    onClick={() => setMap(true)}
                  >
                    Get from Map
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">
                  Select Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  className="form-control"
                  id="exampleFormControlSelect1"
                >
                  <option value="">Select Category</option>
                  <option value="Do">Do</option>
                  <option value="See">See</option>
                  <option value="Eat">Eat</option>
                  <option value="Shop">Shop</option>
                </select>
              </div>
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
                onChange={(e) => setUrl(e.target.value)}
                group
                type="text"
                value={url}
              />
              {/* <MDBCol md="12">
                  <MDBInput
                    label="Other Images"
                    onChange={(e) => setOthers(e.target.value)}
                    group
                    type="text"
                    value={others}
                  />
                </MDBCol> */}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">
                    {others ? (
                      <MDBIcon icon="spinner" spin />
                    ) : (
                      `${urls.length} Images added.`
                    )}
                  </span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    multiple={true}
                    className="custom-file-input"
                    onChange={async (e) => {
                      if (e.target.files.length === 0) return;
                      setOthers(true);
                      console.log(e.target.files.length);
                      const formData = new FormData();
                      for (var x = 0; x < e.target.files.length; x++) {
                        formData.append("file", e.target.files[x]);
                      }
                      const config = {
                        headers: {
                          "content-type": "multipart/form-data",
                        },
                      };
                      const result = await axios.post(
                        "/files/multiple",
                        formData,
                        config
                      );

                      console.log(result.data);
                      setUrls(result.data);
                      setOthers(false);
                    }}
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    Choose file(Multiple)
                  </label>
                </div>
              </div>
              <div className="form-group mt-2">
                <label>Start Time</label>
                <TimePicker
                  timeMode="24"
                  time={startTime === undefined ? "00:00" : `${startTime}`}
                  onTimeChange={(o) => {
                    setStartTime(`${o.hour}:${o.minute}`);
                  }}
                />
              </div>
              <div className="form-group mt-2">
                <label>End Time</label>
                <TimePicker
                  timeMode="24"
                  time={endTime === undefined ? "00:00" : `${endTime}`}
                  onTimeChange={(o) => {
                    setEndTime(`${o.hour}:${o.minute}`);
                  }}
                />
              </div>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="danger" size="sm" onClick={() => setModal(false)}>
              Close
            </MDBBtn>
            <MDBBtn
              onClick={
                edit == null ? () => addListing() : () => updateListing()
              }
              disabled={loading}
              size="sm"
              color="warning"
            >
              Save changes {loading && <MDBIcon icon="spinner" spin />}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>

      <MDBContainer>
        <MDBModal isOpen={map}>
          <MDBModalBody style={{ width: "100%", height: "300px" }}>
            <MapsPage pickAddress={pickAddress} />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              onClick={() => setMap(false)}
              disabled={loading}
              size="sm"
              color="warning"
            >
              Ok {loading && <MDBIcon icon="spinner" spin />}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>

      <MDBCol md="12" middle={true}>
        <MDBBtn
          size="md"
          color="warning"
          onClick={() => {
            setEdit();
            setEndTime();
            setStartTime();
            setUrl();
            urls = [];
            setName();
            setAddress();
            setDescription();
            setCategory();
            setLat();
            setLng();
            setCreatedBy();
            setModal(true);
          }}
        >
          <MDBIcon icon="plus" /> Add New Listing
        </MDBBtn>
        <MDBBtnGroup size="sm">
          <MDBBtn
            color={cc == null ? "warning" : "primary"}
            onClick={() => {
              setCc(null);
            }}
          >
            All
          </MDBBtn>
          {cat.map((c) => (
            <MDBBtn
              color={c == cc ? "warning" : "primary"}
              onClick={() => {
                setCc(c);
              }}
            >
              {c}
            </MDBBtn>
          ))}
        </MDBBtnGroup>
      </MDBCol>
      <MDBCol md="12">
        <MDBCard className="mt-5">
          <MDBView className="gradient-card-header orange darken-2">
            <h4 className="h4-responsive text-white">Listing</h4>
          </MDBView>
          <MDBCardBody>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {(cc == null || cc == "Eat") && eatingTable}
                {(cc == null || cc == "Do") && doingTable}
                {(cc == null || cc == "See") && seeingTable}
                {(cc == null || cc == "Shop") && shoppingTable}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default ListingPage;

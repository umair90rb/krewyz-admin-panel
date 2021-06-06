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

const CommentPage = () => {
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState();
  const { comments, deleteElement, updateElement } = useData();

  const [text, setText] = useState();
  const [city, setCity] = useState();
  const [em, setEm] = useState();

  async function handleDelete(comment) {
    console.log(comment._id);
    deleteElement(comments, comment);
    setRefresh(refresh + 1);
    const result = await axios.delete(`/forumComment/${comment._id}`);
    console.log(result.data);
  }

  async function updateComment() {
    setLoading(true);
    const result = await axios
      .put(`/forumComment/${edit._id}`, {
        commentText: text,
      })
      .catch((e) => {
        setLoading(false);
        return;
      });
    updateElement(comments, edit, result.data);
    console.log(result.data);
    setLoading(false);
    setRefresh(refresh + 1);
    setModal(false);
  }

  const table = comments.map((comment) => (
    <tr key={comment._id}>
      <td>{comment.byEmail}</td>
      <td>{comment.commentText}</td>
      <td>{comment.city}</td>
      <td>
        <MDBBtn
          onClick={() => handleDelete(comment)}
          rounded
          size="sm"
          color="danger"
        >
          <MDBIcon icon="trash" />
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            setEdit(comment);
            setText(comment.commentText);
            setCity(comment.city);
            setEm(comment.byEmail);
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
            {edit != null && "Update Comment (" + edit.byEmail + ")"}
          </MDBModalHeader>
          <MDBModalBody>
            <div className="grey-text">
              <div>
                <MDBInput
                  label="Email"
                  icon="envelope"
                  group
                  disabled={true}
                  type="text"
                  onChange={(e) => setEm(e.target.value)}
                  value={em}
                />
              </div>

              <MDBInput
                label="Comment Text"
                icon="user"
                group
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <MDBInput
                label="City"
                icon="edit"
                group
                disabled={true}
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="danger" size="sm" onClick={() => setModal(false)}>
              Close
            </MDBBtn>
            <MDBBtn
              onClick={edit == null ? null : () => updateComment()}
              disabled={loading}
              size="sm"
              color="warning"
            >
              Save changes {loading && <MDBIcon icon="spinner" spin />}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>

      <MDBCol md="12">
        <MDBCard className="mt-5">
          <MDBView className="gradient-card-header orange darken-2">
            <h4 className="h4-responsive text-white">Comments</h4>
          </MDBView>
          <MDBCardBody>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th>Email</th>
                  <th>Comment</th>
                  <th>City</th>
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

export default CommentPage;

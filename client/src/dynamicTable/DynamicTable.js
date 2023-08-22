import React, { useState, Fragment } from "react";
import "./DynamicTable.css";
import data from "./mockData.json";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

function DynamicTable() {
  const [userDetails, setUserDetails] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const addUser = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleAddUserSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
    const newUserDetails = [...userDetails, newUser];
    setUserDetails(newUserDetails);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newUserDetails = [...userDetails];
    const index = newUserDetails.findIndex((ele) => ele.id === editContactId);
    newUserDetails[index] = editedContact;
    setUserDetails(newUserDetails);
    setEditContactId(null);
  };

  const handleEditClick = (event, userDetail) => {
    event.preventDefault();
    setEditContactId(userDetail.id);

    const formData = {
      fullName: userDetail.fullName,
      address: userDetail.address,
      phoneNumber: userDetail.phoneNumber,
      email: userDetail.email,
    };

    setEditFormData(formData);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (userId) => {
    const userList = [...userDetails];

    const index = userDetails.findIndex((ele) => ele.id === userId);
    userList.splice(index, 1);
    setUserDetails(userList);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone no.</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((userDetail) => (
              <Fragment>
                {editContactId === userDetail.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    userDetail={userDetail}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a user</h2>
      <form onSubmit={handleAddUserSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={addUser}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an address..."
          onChange={addUser}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phoneNumber..."
          onChange={addUser}
        />
        <input
          type="text"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={addUser}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default DynamicTable;

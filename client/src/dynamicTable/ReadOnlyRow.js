import React from "react";

function ReadOnlyRow({ userDetail, handleEditClick , handleDeleteClick}) {
  return (
    <tr>
      <td>{userDetail.fullName}</td>
      <td>{userDetail.address}</td>
      <td>{userDetail.phoneNumber}</td>
      <td>{userDetail.email}</td>
      <td>
      <button type="button" onClick={(event) => handleEditClick(event, userDetail)}>Edit</button>
      <button type="button" onClick={() => handleDeleteClick(userDetail.id)}>Delete</button>

      </td>
    </tr>
  );
}

export default ReadOnlyRow;

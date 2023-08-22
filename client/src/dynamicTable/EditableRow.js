import React from "react";

function EditableRow({ editFormData, handleEditFormChange, handleCancelClick }) {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          value={editFormData.fullName}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an address..."
          value={editFormData.address}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phoneNumber..."
          value={editFormData.phoneNumber}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="email"
          required="required"
          placeholder="Enter an email..."
          value={editFormData.email}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="submit" onClick={handleCancelClick}>Cancel</button>

      </td>
    </tr>
  );
}

export default EditableRow;

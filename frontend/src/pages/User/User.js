// User.js
import React from 'react';
import './User.css';

const User = ({ user, onUpdate, onDelete }) => {
  const { _id, userName, userPhone, userGmail, UserAgree } = user;

  return (
    <tr>
      <td>{userName}</td>
      <td>{userPhone}</td>
      <td>{userGmail}</td>
      <td>{UserAgree ? "Yes" : "No"}</td>
      <td>
        <div className="button-container">
          <div className="btnStf">
            <button className="updatebtn" onClick={onUpdate}>Update</button>
          </div>
          <div className="btnStf">
            <button className="deletebtn" onClick={onDelete}>Delete</button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default User;

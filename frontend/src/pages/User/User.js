import React from 'react';
import './Users.css'; // new css like Doctors.css

const User = ({ user, onUpdate, onDelete }) => {
  const { _id, userName, userPhone, userGmail, userPassword } = user;

  return (
    <tr>
      <td>{userName}</td>
      <td>{userPhone}</td>
      <td>{userGmail}</td>
      <td>{userPassword}</td>
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

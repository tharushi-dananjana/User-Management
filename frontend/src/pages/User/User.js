import React from 'react';
import './Users.css'; 

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
            <button 
              className="updatebtn" 
              onClick={() => onUpdate && onUpdate(user)} // safe guard
            >
              Update
            </button>
          </div>
          <div className="btnStf">
            <button 
              className="deletebtn" 
              onClick={() => onDelete && onDelete(_id)} // safe guard
            >
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default User;

import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <div className="card">
        <div className="card-header">User Information</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Id:</strong> {currentUser.id}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p>
                <strong>Authorities:</strong>
                <ul>
                  {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
              </p>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">Account Actions</div>
                <div className="card-body">
                  <div className="list-group">
                    <button className="list-group-item list-group-item-action">Update Profile</button>
                    <button className="list-group-item list-group-item-action">Change Password</button>
                    <button className="list-group-item list-group-item-action">Order Ambulance</button>
                    <button className="list-group-item list-group-item-action">View Order History</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
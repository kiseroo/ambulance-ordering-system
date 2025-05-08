import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Admin Dashboard</h3>
      </header>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">User Management</div>
            <div className="card-body">
              <div className="list-group">
                <button className="list-group-item list-group-item-action">View All Users</button>
                <button className="list-group-item list-group-item-action">Manage Roles</button>
                <button className="list-group-item list-group-item-action">Reset User Passwords</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">System Management</div>
            <div className="card-body">
              <div className="list-group">
                <button className="list-group-item list-group-item-action">View Ambulance Fleet</button>
                <button className="list-group-item list-group-item-action">Manage Paramedics</button>
                <button className="list-group-item list-group-item-action">View System Logs</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">System Statistics</div>
            <div className="card-body">
              <p>System statistics and analytics will be displayed here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin; 
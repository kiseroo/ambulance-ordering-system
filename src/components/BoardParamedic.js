import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardParamedic = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getParamedicBoard().then(
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
        <h3>Paramedic Dashboard</h3>
      </header>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Current Assignments</div>
            <div className="card-body">
              <p>You don't have any active assignments.</p>
              <div className="list-group">
                <button className="list-group-item list-group-item-action">View Assignment History</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Ambulance Status</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="ambulanceId">Ambulance ID</label>
                  <input type="text" className="form-control" id="ambulanceId" value="AMB-123" readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select className="form-control" id="status">
                    <option>Available</option>
                    <option>On Call</option>
                    <option>Out of Service</option>
                    <option>Maintenance</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="location">Current Location</label>
                  <input type="text" className="form-control" id="location" placeholder="Enter current location" />
                </div>
                <button type="submit" className="btn btn-primary">Update Status</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">Incoming Requests</div>
            <div className="card-body">
              <p>No pending requests.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardParamedic; 
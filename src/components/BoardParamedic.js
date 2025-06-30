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
      <div className="dashboard-header">
        <h3>🚑 Эмчийн удирдлагын самбар</h3>
        <p>Түргэн тусламжийн үйлчилгээ, захиалгын удирдлага, машины төлөв</p>
      </div>
      
      <div className="row">
        <div className="col-lg-6">
          <div className="card-container">
            <div className="d-flex align-items-center mb-4">
              <i className="fas fa-tasks text-primary me-3" style={{fontSize: '2rem'}}></i>
              <h5 className="mb-0">📋 Одоогийн даалгавар</h5>
            </div>
            
            <div className="alert alert-info mb-4">
              <i className="fas fa-info-circle me-2"></i>
              <strong>Мэдээлэл:</strong> Танд одоогоор идэвхтэй даалгавар байхгүй байна.
            </div>
            
            <div className="list-group">
              <button className="list-group-item list-group-item-action d-flex align-items-center">
                <i className="fas fa-history text-info me-3"></i>
                <div>
                  <strong>Даалгаврын түүх харах</strong>
                  <small className="d-block text-muted">Өмнөх гүйцэтгэсэн даалгавруудын мэдээлэл</small>
                </div>
              </button>
              <button className="list-group-item list-group-item-action d-flex align-items-center">
                <i className="fas fa-map-marked-alt text-success me-3"></i>
                <div>
                  <strong>Шинэ захиалга хүлээн авах</strong>
                  <small className="d-block text-muted">Ойролцоох захиалгуудыг харах</small>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card-container">
            <div className="d-flex align-items-center mb-4">
              <i className="fas fa-ambulance text-success me-3" style={{fontSize: '2rem'}}></i>
              <h5 className="mb-0">🚗 Түргэн тусламжийн машины төлөв</h5>
            </div>
            
            <form>
              <div className="form-group">
                <label htmlFor="ambulanceId">🆔 Машины дугаар</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="ambulanceId" 
                  value="AMB-123" 
                  readOnly 
                  style={{backgroundColor: 'var(--gray-100)'}}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="status">📊 Төлөв</label>
                <select className="form-control" id="status">
                  <option>✅ Бэлэн байдалд</option>
                  <option>🚨 Дуудлага дээр</option>
                  <option>🔧 Засварт</option>
                  <option>⏸️ Ажиллахгүй</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">📍 Одоогийн байршил</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="location" 
                  placeholder="Одоогийн байршлаа оруулна уу" 
                />
              </div>
              
              <button type="submit" className="btn btn-primary btn-block">
                <i className="fas fa-sync-alt me-2"></i>
                Төлөв шинэчлэх
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12">
          <div className="card-container">
            <div className="d-flex align-items-center mb-4">
              <i className="fas fa-bell text-warning me-3" style={{fontSize: '2rem'}}></i>
              <h5 className="mb-0">📞 Ирж буй захиалгууд</h5>
            </div>
            
            <div className="alert alert-success">
              <i className="fas fa-check-circle me-2"></i>
              <strong>Мэдээлэл:</strong> Одоогоор хүлээгдэж буй захиалга байхгүй байна.
            </div>
            
            <div className="row text-center">
              <div className="col-md-4">
                <div className="stat-item">
                  <i className="fas fa-clock text-warning" style={{fontSize: '2rem'}}></i>
                  <h4 className="mt-2 mb-1 text-warning">0</h4>
                  <small className="text-muted">Хүлээгдэж буй</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-item">
                  <i className="fas fa-ambulance text-primary" style={{fontSize: '2rem'}}></i>
                  <h4 className="mt-2 mb-1 text-primary">0</h4>
                  <small className="text-muted">Хийгдэж байгаа</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-item">
                  <i className="fas fa-check-circle text-success" style={{fontSize: '2rem'}}></i>
                  <h4 className="mt-2 mb-1 text-success">12</h4>
                  <small className="text-muted">Өнөөдөр дууссан</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardParamedic;
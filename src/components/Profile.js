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
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="dashboard-header">
            <h3>👤 Хэрэглэгчийн профайл</h3>
            <p>Таны бүртгэлийн мэдээлэл болон системийн эрхүүд</p>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <div className="card-container">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="fas fa-user-circle" style={{fontSize: '5rem', color: 'var(--primary-color)'}}></i>
                  </div>
                  <h4 className="text-primary">{currentUser.username}</h4>
                  <p className="text-muted">{currentUser.email}</p>
                </div>
                
                <div className="profile-info">
                  <div className="info-item mb-3">
                    <strong>🆔 Хэрэглэгчийн ID:</strong>
                    <span className="ms-2">{currentUser.id}</span>
                  </div>
                  
                  <div className="info-item mb-3">
                    <strong>📧 И-мэйл хаяг:</strong>
                    <span className="ms-2">{currentUser.email}</span>
                  </div>
                  
                  <div className="info-item mb-3">
                    <strong>🔐 Системийн эрх:</strong>
                    <div className="mt-2">
                      {currentUser.roles &&
                        currentUser.roles.map((role, index) => (
                          <span key={index} className="badge badge-info me-2 mb-1">
                            {role === 'ROLE_ADMIN' && '👨‍💼 Админ'}
                            {role === 'ROLE_PARAMEDIC' && '🚑 Эмч'}
                            {role === 'ROLE_USER' && '👤 Хэрэглэгч'}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card-container">
                <h5 className="mb-4">⚙️ Бүртгэлийн үйлдлүүд</h5>
                <div className="list-group">
                  <button className="list-group-item list-group-item-action d-flex align-items-center">
                    <i className="fas fa-edit text-primary me-3"></i>
                    <div>
                      <strong>Профайл засах</strong>
                      <small className="d-block text-muted">Хувийн мэдээллээ шинэчлэх</small>
                    </div>
                  </button>
                  
                  <button className="list-group-item list-group-item-action d-flex align-items-center">
                    <i className="fas fa-key text-warning me-3"></i>
                    <div>
                      <strong>Нууц үг солих</strong>
                      <small className="d-block text-muted">Аюулгүй байдлын тулд нууц үгээ солих</small>
                    </div>
                  </button>
                  
                  <a href="/user" className="list-group-item list-group-item-action d-flex align-items-center">
                    <i className="fas fa-ambulance text-danger me-3"></i>
                    <div>
                      <strong>Түргэн тусламж захиалах</strong>
                      <small className="d-block text-muted">Шинэ захиалга өгөх</small>
                    </div>
                  </a>
                  
                  <button className="list-group-item list-group-item-action d-flex align-items-center">
                    <i className="fas fa-history text-info me-3"></i>
                    <div>
                      <strong>Захиалгын түүх</strong>
                      <small className="d-block text-muted">Өмнөх захиалгуудын мэдээлэл харах</small>
                    </div>
                  </button>
                  
                  <button className="list-group-item list-group-item-action d-flex align-items-center">
                    <i className="fas fa-bell text-secondary me-3"></i>
                    <div>
                      <strong>Мэдэгдлийн тохиргоо</strong>
                      <small className="d-block text-muted">И-мэйл болон SMS мэдэгдэл тохируулах</small>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-12">
              <div className="card-container">
                <h5 className="mb-4">📊 Бүртгэлийн статистик</h5>
                <div className="row text-center">
                  <div className="col-md-3">
                    <div className="stat-item">
                      <i className="fas fa-ambulance text-primary" style={{fontSize: '2rem'}}></i>
                      <h4 className="mt-2 mb-1">0</h4>
                      <small className="text-muted">Нийт захиалга</small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-item">
                      <i className="fas fa-check-circle text-success" style={{fontSize: '2rem'}}></i>
                      <h4 className="mt-2 mb-1">0</h4>
                      <small className="text-muted">Дууссан захиалга</small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-item">
                      <i className="fas fa-clock text-warning" style={{fontSize: '2rem'}}></i>
                      <h4 className="mt-2 mb-1">0</h4>
                      <small className="text-muted">Хүлээгдэж буй</small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-item">
                      <i className="fas fa-calendar text-info" style={{fontSize: '2rem'}}></i>
                      <h4 className="mt-2 mb-1">0</h4>
                      <small className="text-muted">Товлосон</small>
                    </div>
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
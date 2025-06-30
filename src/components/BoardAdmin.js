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
      <div className="dashboard-header">
        <h3>👨‍💼 Админ удирдлагын самбар</h3>
        <p>Системийн ерөнхий удирдлага, хэрэглэгчийн эрх, статистик мэдээлэл</p>
      </div>
      
      <div className="row">
        <div className="col-lg-6">
          <div className="card-container">
            <div className="d-flex align-items-center mb-4">
              <i className="fas fa-users text-primary me-3" style={{fontSize: '2rem'}}></i>
              <h5 className="mb-0">👥 Хэрэглэгчийн удирдлага</h5>
            </div>
            <div className="list-group">
              <button className="list-group-item list-group-item-action d-flex align-items-center">
                <i className="fas fa-list text-info me-3"></i>
                <div>
                  <strong>Бүх хэрэглэгчийг харах</strong>
                  <small className="d-block text-muted">Бүртгэлтэй хэрэглэгчдийн жагсаалт</small>
                </div>
              </button>
              <button className="list-group-item list-group-item-action d-flex align-items-center">
                <i className="fas fa-user-cog text-warning me-3"></i>
                <div>
                  <strong>Эрх удирдах</strong>
                  <small className="d-block text-muted">Хэрэглэгчдийн эрх тохируулах</small>
                </div>
              </button>
              <button className="list-group-item list-group-item-action d-flex align-items-center">
                <i className="fas fa-key text-danger me-3"></i>
                <div>
                  <strong>Нууц үг шинэчлэх</strong>
                  <small className="d-block text-muted">Хэрэглэгчийн нууц үг дахин тохируулах</small>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card-container">
            <div className="d-flex align-items-center mb-4">
              <i className="fas fa-cogs text-success me-3" style={{fontSize: '2rem'}}></i>
              <h5 className="mb-0">⚙️ Системийн удирдлага</h5>
            </div>
            <div className="list-group">
              <button className="list-group-item list-group-item-action d-flex align-items-center">
                <i className="fas fa-ambulance text-primary me-3"></i>
                <div>
                  <strong>Түргэн тусламжийн машин</strong>
                  <small className="d-block text-muted">Машины жагсаалт, төлөв харах</small>
                </div>
              </button>
              <button className="list-group-item list-group-item-action d-flex align-items-center">
                <i className="fas fa-user-md text-success me-3"></i>
                <div>
                  <strong>Эмч нарын удирдлага</strong>
                  <small className="d-block text-muted">Эмч, сувилагчдын мэдээлэл</small>
                </div>
              </button>
              <button className="list-group-item list-group-item-action d-flex align-items-center">
                <i className="fas fa-file-alt text-info me-3"></i>
                <div>
                  <strong>Системийн лог харах</strong>
                  <small className="d-block text-muted">Системийн үйл ажиллагааны түүх</small>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12">
          <div className="card-container">
            <div className="d-flex align-items-center mb-4">
              <i className="fas fa-chart-bar text-warning me-3" style={{fontSize: '2rem'}}></i>
              <h5 className="mb-0">📊 Системийн статистик</h5>
            </div>
            
            <div className="row text-center mb-4">
              <div className="col-md-3">
                <div className="stat-item">
                  <i className="fas fa-users text-primary" style={{fontSize: '2.5rem'}}></i>
                  <h3 className="mt-2 mb-1 text-primary">156</h3>
                  <small className="text-muted">Нийт хэрэглэгч</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-item">
                  <i className="fas fa-ambulance text-success" style={{fontSize: '2.5rem'}}></i>
                  <h3 className="mt-2 mb-1 text-success">1,247</h3>
                  <small className="text-muted">Нийт захиалга</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-item">
                  <i className="fas fa-check-circle text-info" style={{fontSize: '2.5rem'}}></i>
                  <h3 className="mt-2 mb-1 text-info">1,198</h3>
                  <small className="text-muted">Дууссан захиалга</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-item">
                  <i className="fas fa-user-md text-warning" style={{fontSize: '2.5rem'}}></i>
                  <h3 className="mt-2 mb-1 text-warning">24</h3>
                  <small className="text-muted">Идэвхтэй эмч</small>
                </div>
              </div>
            </div>
            
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              <strong>Системийн мэдээлэл:</strong> Системийн дэлгэрэнгүй статистик болон аналитик мэдээллийг энд харуулна. 
              Өдөр тутмын захиалгын тоо, хариу үйлдлийн хугацаа, хэрэглэгчдийн идэвхжил зэрэг мэдээллүүд багтана.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;
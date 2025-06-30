import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [bookingType, setBookingType] = useState("emergency");
  const [bookings, setBookings] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  
  const [formData, setFormData] = useState({
    pickup: "",
    contact: "",
    ambulanceType: "Энгийн тусламж",
    date: "",
    time: "",
    notes: ""
  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    
    UserService.getUserBoard().then(
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
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a random booking ID
    const bookingId = "#AMB" + Math.floor(10000 + Math.random() * 90000);
    
    // Get current date
    const today = new Date();
    const date = today.toLocaleDateString('mn-MN', { 
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit'
    });
    
    // Create new booking
    const newBooking = {
      id: bookingId,
      date: date,
      type: bookingType === "emergency" ? "Яаралтай" : "Төлөвлөгөөт",
      status: bookingType === "emergency" ? "Хийгдэж байна" : "Товлосон"
    };
    
    // Add to bookings list
    setBookings([newBooking, ...bookings]);
    
    // Reset form
    setFormData({
      pickup: "",
      contact: "",
      ambulanceType: "Энгийн тусламж",
      date: "",
      time: "",
      notes: ""
    });
    
    // Show enhanced confirmation
    const message = `✅ ${bookingType === "emergency" ? "Яаралтай" : "Төлөвлөгөөт"} түргэн тусламж захиалга амжилттай илгээгдлээ!\n\n📋 Захиалгын дугаар: ${bookingId}\n📅 Огноо: ${date}\n\n🚑 Манай баг удахгүй таны дэргэд очих болно.\n📞 Холбоо барих: 103`;
    alert(message);
  };

  return (
    <div className="container-fluid">
      <div className="dashboard-header">
        <h3>👋 Хэрэглэгчийн удирдлагын самбар</h3>
        <p>Сайн байна уу, <strong>{currentUser?.username}</strong>! Таны эрүүл мэнд бидний анхаарлын төвд байдаг. Хэрэгтэй үед бид таны дэргэд байна.</p>
      </div>
      
      <div className="row">
        <div className="col-lg-6">
          <div className="booking-card">
            <div className="booking-header">
              <h3>🚑 Түргэн тусламж захиалах</h3>
              <div className="booking-tabs">
                <button 
                  className={`booking-tab ${bookingType === 'emergency' ? 'active' : ''}`}
                  onClick={() => setBookingType('emergency')}
                >
                  <i className="fas fa-ambulance"></i>
                  Яаралтай
                </button>
                <button 
                  className={`booking-tab ${bookingType === 'planned' ? 'active' : ''}`}
                  onClick={() => setBookingType('planned')}
                >
                  <i className="fas fa-calendar-alt"></i>
                  Төлөвлөгөөт
                </button>
              </div>
            </div>
            <div className="booking-body">
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>📍 Авах хаяг</label>
                      <div className="input-with-icon">
                        <i className="fas fa-map-marker-alt"></i>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Дэлгэрэнгүй хаягаа оруулна уу"
                          name="pickup"
                          value={formData.pickup}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>📞 Утасны дугаар</label>
                      <div className="input-with-icon">
                        <i className="fas fa-phone"></i>
                        <input 
                          type="tel" 
                          className="form-control" 
                          placeholder="Идэвхтэй утасны дугаар"
                          name="contact"
                          value={formData.contact}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>🏥 Түргэн тусламжийн төрөл</label>
                      <div className="input-with-icon">
                        <i className="fas fa-ambulance"></i>
                        <select 
                          className="form-control"
                          name="ambulanceType"
                          value={formData.ambulanceType}
                          onChange={handleInputChange}
                        >
                          <option>Энгийн тусламж</option>
                          <option>Яаралтай тусламж</option>
                          <option>Өвчтөн шилжүүлэх</option>
                          <option>Тахилын үйлчилгээ</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {bookingType === 'planned' && (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>📅 Огноо</label>
                        <div className="input-with-icon">
                          <i className="fas fa-calendar"></i>
                          <input 
                            type="date" 
                            className="form-control"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required={bookingType === 'planned'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>⏰ Цаг</label>
                        <div className="input-with-icon">
                          <i className="fas fa-clock"></i>
                          <input 
                            type="time" 
                            className="form-control"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            required={bookingType === 'planned'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <label>📝 Нэмэлт тэмдэглэл</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    placeholder="Өвчтөний байдал, эмнэлзүйн тусгай хэрэгцээ эсвэл бусад чухал мэдээллийг энд бичнэ үү..."
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn booking-button">
                  {bookingType === 'emergency' ? '🚨 Яаралтай захиалах' : '📋 Төлөвлөгөөт захиалга хийх'}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="recent-bookings-section">
            <h3 className="section-title">📋 Миний хийсэн захиалгууд</h3>
            <div className="recent-bookings-table">
              {bookings.length > 0 ? (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Захиалгын дугаар</th>
                        <th>Огноо</th>
                        <th>Төрөл</th>
                        <th>Төлөв</th>
                        <th>Үйлдэл</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <tr key={index}>
                          <td><strong>{booking.id}</strong></td>
                          <td>{booking.date}</td>
                          <td>
                            <span className="d-flex align-items-center">
                              {booking.type === 'Яаралтай' && <i className="fas fa-ambulance text-danger me-2"></i>}
                              {booking.type === 'Төлөвлөгөөт' && <i className="fas fa-calendar text-primary me-2"></i>}
                              {booking.type}
                            </span>
                          </td>
                          <td>
                            <span className={`badge badge-${booking.status === 'Дууссан' ? 'success' : booking.status === 'Товлосон' ? 'warning' : 'info'}`}>
                              {booking.status === 'Дууссан' && '✅ '}
                              {booking.status === 'Товлосон' && '📅 '}
                              {booking.status === 'Хийгдэж байна' && '🚑 '}
                              {booking.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-outline-primary btn-sm">
                              <i className="fas fa-eye me-1"></i>
                              Дэлгэрэнгүй
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="no-bookings-message">
                  <i className="fas fa-clipboard-list empty-icon"></i>
                  <h5>Танд одоогоор идэвхтэй захиалга байхгүй байна</h5>
                  <p>Шинэ захиалга өгөхийн тулд зүүн талын формыг бөглөнө үү.</p>
                  <p>🚑 Бид таны дуудлагыг хүлээж байна.</p>
                  <p>📞 Яаралтай тохиолдолд: <strong>103</strong></p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardUser;
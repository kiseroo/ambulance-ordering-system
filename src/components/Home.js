import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Home = () => {
  const [content, setContent] = useState("");
  const [bookingType, setBookingType] = useState("emergency");
  const [currentUser, setCurrentUser] = useState(undefined);
  const [bookings, setBookings] = useState([
    {
      id: "#AMB12345",
      date: "2023.05.10",
      type: "Яаралтай",
      status: "Дууссан"
    },
    {
      id: "#AMB12346",
      date: "2023.05.12",
      type: "Төлөвлөгөөт",
      status: "Товлосон"
    },
    {
      id: "#AMB12347",
      date: "2023.05.15",
      type: "Өвчтөн шилжүүлэх",
      status: "Хийгдэж байна"
    }
  ]);
  
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
    
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
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
      month: 'numeric', 
      day: 'numeric'
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
    
    // Show confirmation
    alert(`${bookingType === "emergency" ? "Яаралтай" : "Төлөвлөгөөт"} түргэн тусламж захиалга амжилттай. Захиалгын дугаар: ${bookingId}`);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="hero-title">Түргэн тусламж хэрэгтэй юу?</h1>
              <h3 className="hero-subtitle">Танд эсвэл таны хайртай хүмүүст яаралтай эмнэлгийн тусламж хэрэгтэй байна уу? Бид таны дэргэд байна.</h3>
              <p className="hero-text">
                Манай мэргэшсэн эмч, сувилагч нарын баг таны аюулгүй байдлыг хангахад үргэлж бэлэн.<br/>
                Яаралтай болон төлөвлөгөөт түргэн тусламжийн үйлчилгээ 24/7 нээлттэй.<br/>
                Хаана ч, хэзээ ч - танд хэрэгтэй үед бид дуудлагад бэлэн.
              </p>
              <Link 
                to={currentUser ? "#booking-section" : "/login"} 
                className="btn hero-button yellow-button"
                onClick={(e) => {
                  if (currentUser) {
                    e.preventDefault();
                    document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Түргэн тусламж захиалах
              </Link>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <div className="hero-image-container">
                <img 
                  src="https://www.shutterstock.com/image-vector/emergency-medical-service-vehicle-ambulance-600nw-2455439761.jpg" 
                  alt="Түргэн тусламж" 
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="booking-section" id="booking-section">
        <div className="container">
          <div className="booking-card">
            <div className="booking-header">
              <h3 className="text-center mb-4">Түргэн тусламж захиалах</h3>
              <div className="booking-tabs">
                <button 
                  className={`booking-tab ${bookingType === 'emergency' ? 'active' : ''}`}
                  onClick={() => setBookingType('emergency')}
                >
                  <i className="fas fa-ambulance mr-2"></i> Яаралтай
                </button>
                <button 
                  className={`booking-tab ${bookingType === 'planned' ? 'active' : ''}`}
                  onClick={() => setBookingType('planned')}
                >
                  <i className="fas fa-calendar-alt mr-2"></i> Төлөвлөгөөт
                </button>
              </div>
            </div>
            <div className="booking-body">
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Авах хаяг</label>
                      <div className="input-with-icon">
                        <i className="fas fa-map-marker-alt"></i>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Хаягаа оруулна уу"
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
                      <label>Утасны дугаар</label>
                      <div className="input-with-icon">
                        <i className="fas fa-phone"></i>
                        <input 
                          type="tel" 
                          className="form-control" 
                          placeholder="Утасны дугаар"
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
                      <label>Түргэн тусламжийн төрөл</label>
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
                        <label>Огноо</label>
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
                        <label>Цаг</label>
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
                  <label>Нэмэлт тэмдэглэл</label>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Өвчтөний байдал болон бусад мэдээлэл"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-lg btn-block booking-button yellow-button">
                  {bookingType === 'emergency' ? 'Яаралтай захиалах' : 'Төлөвлөгөөт захиалга хийх'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <h2 className="section-title text-center">Бидний давуу тал</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <h4>24/7 Үйлчилгээ</h4>
                <p>Бидний түргэн тусламжийн машинууд 24 цагийн турш таны үйлчилгээнд бэлэн.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-user-md"></i>
                </div>
                <h4>Мэргэжлийн багийнхан</h4>
                <p>Мэргэжлийн эмч, сувилагч нар таны эрүүл мэндэд үйлчилнэ.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                <h4>Хурдан хугацаанд</h4>
                <p>Түргэн шуурхай үйлчилгээг бид танд хүргэнэ.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="steps-section">
        <div className="container">
          <h2 className="section-title text-center">Үйлчилгээний алхамууд</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">1</div>
              <h4>Захиалах</h4>
              <p>Вэб эсвэл аппликейшн ашиглан захиалга өгөх</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-icon">2</div>
              <h4>Баталгаажуулах</h4>
              <p>Захиалгын баталгаажуулалт хүлээн авах</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-icon">3</div>
              <h4>Хянах</h4>
              <p>Түргэн тусламжийн машины байршлыг хянах</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-icon">4</div>
              <h4>Тусламж</h4>
              <p>Мэргэжлийн тусламж үйлчилгээ авах</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div className="recent-bookings-section">
        <div className="container">
          <h2 className="section-title text-center">Сүүлийн захиалгууд</h2>
          <div className="recent-bookings-table">
            <table className="table table-striped">
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
                    <td>{booking.id}</td>
                    <td>{booking.date}</td>
                    <td>{booking.type}</td>
                    <td>
                      <span className={`badge badge-${booking.status === 'Дууссан' ? 'success' : booking.status === 'Товлосон' ? 'warning' : 'info'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td><button className="btn btn-sm btn-outline-primary">Харах</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
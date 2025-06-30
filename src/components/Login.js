import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    let formErrors = {};
    let formIsValid = true;
    
    if (!username) {
      formIsValid = false;
      formErrors["username"] = "Хэрэглэгчийн нэр шаардлагатай";
    }

    if (!password) {
      formIsValid = false;
      formErrors["password"] = "Нууц үг шаардлагатай";
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (validateForm()) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage("Хэрэглэгчийн нэр эсвэл нууц үг буруу байна");
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card-container">
            <div className="text-center mb-4">
              <div className="mb-3">
                <i className="fas fa-user-circle" style={{fontSize: '4rem', color: 'var(--primary-color)'}}></i>
              </div>
              <h2 className="auth-title">🔐 Нэвтрэх</h2>
              <p className="auth-subtitle">Өөрийн бүртгэлээр нэвтэрч орно уу</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">👤 Хэрэглэгчийн нэр</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  placeholder="Хэрэглэгчийн нэрээ оруулна уу"
                />
                {errors.username && (
                  <div className="alert alert-danger mt-2" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {errors.username}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">🔒 Нууц үг</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  placeholder="Нууц үгээ оруулна уу"
                />
                {errors.password && (
                  <div className="alert alert-danger mt-2" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  )}
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Нэвтрэх
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {message}
                  </div>
                </div>
              )}

              <div className="text-center mt-4">
                <p className="mb-2">Бүртгэл байхгүй юу?</p>
                <a href="/register" className="btn btn-outline-primary">
                  <i className="fas fa-user-plus me-2"></i>
                  Шинээр бүртгүүлэх
                </a>
              </div>

              <div className="text-center mt-4 pt-3" style={{borderTop: '1px solid var(--gray-200)'}}>
                <small className="text-muted">
                  <strong>Туршилтын бүртгэлүүд:</strong><br/>
                  👨‍💼 Админ: admin / admin123<br/>
                  🚑 Эмч: paramedic / paramedic123
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
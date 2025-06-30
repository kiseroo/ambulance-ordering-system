import React, { useState } from "react";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const validateForm = () => {
    let formErrors = {};
    let formIsValid = true;
    
    if (!username) {
      formIsValid = false;
      formErrors["username"] = "Хэрэглэгчийн нэр шаардлагатай";
    } else if (username.length < 3 || username.length > 20) {
      formIsValid = false;
      formErrors["username"] = "Хэрэглэгчийн нэр 3-20 тэмдэгт байх ёстой";
    }

    if (!email) {
      formIsValid = false;
      formErrors["email"] = "И-мэйл хаяг шаардлагатай";
    } else if (!isEmail(email)) {
      formIsValid = false;
      formErrors["email"] = "И-мэйл хаягийн формат буруу байна";
    }

    if (!password) {
      formIsValid = false;
      formErrors["password"] = "Нууц үг шаардлагатай";
    } else if (password.length < 6 || password.length > 40) {
      formIsValid = false;
      formErrors["password"] = "Нууц үг 6-40 тэмдэгт байх ёстой";
    }

    if (!firstName) {
      formIsValid = false;
      formErrors["firstName"] = "Нэр шаардлагатай";
    }

    if (!lastName) {
      formIsValid = false;
      formErrors["lastName"] = "Овог шаардлагатай";
    }

    if (!phoneNumber) {
      formIsValid = false;
      formErrors["phoneNumber"] = "Утасны дугаар шаардлагатай";
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    if (validateForm()) {
      AuthService.register(
        username, 
        email, 
        password,
        firstName,
        lastName,
        phoneNumber
      ).then(
        (response) => {
          setMessage("Бүртгэл амжилттай үүслээ! Одоо нэвтэрч орж болно.");
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card-container">
            <div className="text-center mb-4">
              <div className="mb-3">
                <i className="fas fa-user-plus" style={{fontSize: '4rem', color: 'var(--primary-color)'}}></i>
              </div>
              <h2 className="auth-title">📝 Бүртгүүлэх</h2>
              <p className="auth-subtitle">Шинэ бүртгэл үүсгэж, түргэн тусламжийн үйлчилгээ авна уу</p>
            </div>

            <form onSubmit={handleRegister}>
              {!successful && (
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="firstName">👤 Нэр</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={firstName}
                          onChange={onChangeFirstName}
                          placeholder="Нэрээ оруулна уу"
                        />
                        {errors.firstName && (
                          <div className="alert alert-danger mt-2" role="alert">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="lastName">👥 Овог</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={lastName}
                          onChange={onChangeLastName}
                          placeholder="Овгоо оруулна уу"
                        />
                        {errors.lastName && (
                          <div className="alert alert-danger mt-2" role="alert">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="username">🏷️ Хэрэглэгчийн нэр</label>
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
                    <label htmlFor="email">📧 И-мэйл хаяг</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={onChangeEmail}
                      placeholder="И-мэйл хаягаа оруулна уу"
                    />
                    {errors.email && (
                      <div className="alert alert-danger mt-2" role="alert">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phoneNumber">📞 Утасны дугаар</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={onChangePhoneNumber}
                      placeholder="Утасны дугаараа оруулна уу"
                    />
                    {errors.phoneNumber && (
                      <div className="alert alert-danger mt-2" role="alert">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {errors.phoneNumber}
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
                    <button className="btn btn-primary btn-block">
                      <i className="fas fa-user-plus me-2"></i>
                      Бүртгүүлэх
                    </button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    <i className={`fas ${successful ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
                    {message}
                  </div>
                </div>
              )}

              {successful && (
                <div className="text-center mt-4">
                  <a href="/login" className="btn btn-primary">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Нэвтрэх хуудас руу очих
                  </a>
                </div>
              )}

              {!successful && (
                <div className="text-center mt-4">
                  <p className="mb-2">Бүртгэлтэй юу?</p>
                  <a href="/login" className="btn btn-outline-primary">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Нэвтрэх
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
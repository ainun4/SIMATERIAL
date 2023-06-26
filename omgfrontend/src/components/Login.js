import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../Services/auth.services";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../image/logo_png.png';

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          navigate("/dasbor");
          window.location.reload();
        },
        (error) => {
          const resMessage = "Email atau password Anda salah";
          console.log("gagal");
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div class="body">
      <div class="container" id="container">
        <div className="background">

          <div className="left-side">
            <img src={logo} />
            <Form class="form-login" onSubmit={handleLogin} ref={form}>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required]}
                placeholder="Email Address"
              />

              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
                placeholder="Password"
              />
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />

              <button class="button-login" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </Form>
          </div>
          <div className="right-side">
            <h1>PT BUMI WIJAYA PERKASA</h1>
            <p>Selamat datang! Silakan masuk untuk menggunakan sistem!</p>
          </div>
        </div>

      </div>
    </div>

  );
};

export default Login;

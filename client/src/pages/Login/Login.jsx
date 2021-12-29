import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const data = { username: username, password: password };
    Axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="login">
      <form className="form-container">
        <label htmlFor="username">Nombre de usuario</label>
        <input
          type="text"
          name="username"
          className="input-register"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          className="input-register"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button className="btn btn-primary" onClick={login}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;

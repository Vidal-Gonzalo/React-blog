import React, { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ ...authState, status: false });
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {authState.status ? (
          <NavLink to="/" className="navbar-brand">
            Inicio
          </NavLink>
        ) : null}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!authState.status ? (
              <>
                {" "}
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Iniciar sesión
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Registrarse
                  </NavLink>
                </li>{" "}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/createpost"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Crear publicación
                  </NavLink>
                </li>
                <h3 className="text-white me-3">{authState.username}</h3>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => logout("/login")}
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

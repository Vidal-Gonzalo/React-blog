import React, { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { authState } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Inicio
        </NavLink>
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
            <li className="nav-item">
              <NavLink
                to="/createpost"
                className="nav-link active"
                aria-current="page"
              >
                Crear publicación
              </NavLink>
            </li>
            {!authState && (
              <>
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
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1>Error 404: página no encontrada</h1>
      <p>
        <Link to="/">Ir al inicio</Link>
      </p>
    </div>
  );
}

export default PageNotFound;

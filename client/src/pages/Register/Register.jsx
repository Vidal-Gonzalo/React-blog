import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import "./Register.css";

function Register() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Campo vacío"),
    password: Yup.string().min(4).max(20).required("Campo vacío"),
  });

  const onSubmit = (data) => {
    Axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className="register">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form-container">
          <label>Nombre de usuario</label>
          <Field
            autoComplete="off"
            className="input-register"
            name="username"
            placeholder="Nombre de usuario"
          />
          <ErrorMessage name="username" component="span" />

          <label>Password</label>
          <Field
            type="password"
            autoComplete="off"
            className="input-register"
            name="password"
            placeholder="Contraseña"
          />
          <ErrorMessage name="password" component="span" />
          <button type="submit"> Registrarse </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;

// Register.jsx
import React from "react";
import Button from "./Button";

function Register({ onChange, values, auth, setAuth }) {
  const { email = "", pass = "", pass2 = "", error, exito } = values || {};

  const validarRegistro = (e) => {
    e.preventDefault();
    const { email, pass, pass2 } = auth.input;

    if (!email?.trim() || !pass?.trim() || !pass2?.trim()) {
      // si no existe, elimina los espacios vacios (valida si existe y que no hayan espacios en blanco)
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "Todos los campos son obligatorios",
          exito: "",
        },
      }));
    }

    if (pass !== pass2) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "Las contraseñas no coinciden",
          exito: "",
        },
      }));
    }

    if (pass.length < 6) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "La contraseña debe tener al menos 6 caracteres",
          exito: "",
        },
      }));
    }

    const usuarioEncontrado = auth.users.find((user) => user.email === email);

    if (usuarioEncontrado) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "El email ya está registrado",
          exito: "",
        },
      }));
    }

    setAuth((prev) => ({
      ...prev,
      users: [...prev.users, { email, pass }],
      input: {
        email: "",
        pass: "",
        pass2: "",
        error: "",
        exito: "Usuario creado exitosamente",
      },
    }));

    alert(`${email} creado exitosamente`);
  };

  return (
    <form
      onSubmit={validarRegistro}
      className="form"
    >
      <h3 className="mt-3">🔐 Registrar Usuario</h3>
      {error && <p className="alert bg-danger py-1 mt-3">{error}</p>}
      {exito && <p className="alert bg-success py-1 mt-3">{exito}</p>}
      <div className="mb-3 container">
        <label className="d-flex">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          className="form-control"
          placeholder="Email"
        />
      </div>

      <div className="mb-3 container">
        <label className="d-flex">Contraseña:</label>
        <input
          type="password"
          name="pass"
          value={pass}
          onChange={onChange}
          className="form-control"
          placeholder="contraseña"
        />
      </div>

      <div className="mb-3 container">
        <label className="d-flex">Confirmar Contraseña:</label>
        <input
          type="password"
          name="pass2"
          value={pass2}
          onChange={onChange}
          className="form-control mb-3"
          placeholder="Re-ingresar contraseña"
        />
        <Button
          type="submit"
          className={`btn-outline-light mt-1 container p-2`}
          buttonText={"Registrar"}
        />
        <label style={{ fontSize: "0.7rem" }} className="mt-2">
          ¿Ya tienes una cuenta?
        </label>
        <Button
          className={`btn-outline-light mt-1 container p-2`}
          buttonText={"Iniciar Sesión"}
        />
      </div>
    </form>
  );
}

export default Register;

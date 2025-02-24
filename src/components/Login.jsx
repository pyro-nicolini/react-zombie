import React from "react";
import Button from "./Button";

function Login({ onChange, values, auth, setAuth }) {
  const { email, pass, error, exito } = values;

  const validarLogin = (e) => {
    e.preventDefault();
    const { email, pass } = auth.input;

    if (!email?.trim() || !pass?.trim()) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "Todos los campos son obligatorios",
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

    const usuarioEncontrado = auth.users.find(
      (user) => user.email === email && user.pass === pass
    );

    if (!usuarioEncontrado) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "Usuario y/o contraseña no válidos",
          exito: "",
        },
      }));
    }

    setAuth((prev) => ({
      ...prev,
      autorizado: true,
      autenticado: usuarioEncontrado,
      input: {
        email: "",
        pass: "",
        error: "",
        exito: `Inicio de sesión exitoso`,
      },
    }));

    alert(`¡Bienvenido, ${email}!`);
  };

  return (
    <form
      onSubmit={validarLogin}
      className="d-flex flex-column text-white p-3 rounded"
    >
      <h3 className="mt-3">🔓 Iniciar Sesión</h3>
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
        <Button
          type="submit"
          className={`btn-outline-light mt-3 container p-2`}
          buttonText={"Iniciar Sesión"}
        />
        <a href="#" className="text-white d-flex justify-content-center">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </form>
  );
}

export default Login;

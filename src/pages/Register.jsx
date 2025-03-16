import Button from "../components/Button";
import zom1 from "../images/zom1.png";

function RegisterPage({ onChange, values, auth, setAuth }) {
  const { email = "", pass = "", pass2 = "", error, exito } = values || {};

  const validarRegistro = (e) => {
    e.preventDefault();
    const { email, pass, pass2 } = auth.input;

    if (!email?.trim() || !pass?.trim() || !pass2?.trim()) {
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
    <form onSubmit={validarRegistro} className="form">
      <div className="flex">
        <img src={zom1} alt="" className="zombie2" />
      </div>
      <h3>🔐 Registrar Usuario</h3>
      {error && <div className="alert">{error}</div>}
      {exito && <div className="exito">{exito}</div>}

      <div className="titleForm">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          className="flex"
          placeholder="Email"
        />
      </div>

      <div className="titleForm">
        <label>Contraseña:</label>
        <input
          type="password"
          name="pass"
          value={pass}
          onChange={onChange}
          className="flex"
          placeholder="contraseña"
        />
      </div>
      <div className="titleForm">
        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          name="pass2"
          value={pass2}
          onChange={onChange}
          className="flex"
          placeholder="Re-ingresar contraseña"
        />
      </div>
      <div className="column space gap">
        <Button type="submit" className={`padding`} buttonText={"Registrar"} />
        <p style={{ fontSize: "0.9rem" }}>¿Ya tienes una cuenta?</p>
        <Button className={`padding`} buttonText={"Iniciar Sesión"} />
      </div>
    </form>
  );
}

export default RegisterPage;

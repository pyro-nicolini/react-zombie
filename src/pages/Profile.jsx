import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Profile({ onLogout, auth }) {
  const { autorizado, autenticado } = auth || {};
  const email = autenticado ? autenticado.email : "";
  return (
    <>
      {autorizado ? (
        <div className="white">
          <h1>Profile</h1>
          <div className="account">
            <p>Perfil</p>
            <Button
              className="perfil"
              buttonText={`${email}`}
              buttonImg={" "}
            />
            <Link to="/" onClick={onLogout}>
              <Button className="navLink red" buttonText={"Cerrar Sesión"} />
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

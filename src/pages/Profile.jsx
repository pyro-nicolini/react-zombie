import { useContext } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { cerrarSesion } from "../utilities/helper";

export default function Profile() {
  const { auth, setAuth } = useContext(AuthContext)
  const { autorizado, autenticado } = auth || {};

  const email = autenticado ? autenticado.email : "";
  return (
    <>
      <div className="card2">
          <div className="white column flex" style={{justifyContent: 'space-between', gap: '3rem'}}>
              <h1 className="flex">R.I.P</h1>
            <div className="account">
              <p>Perfil Zombie</p>
              <Button
                className="perfil"
                buttonText={`${email}`}
                buttonImg={" "}
              />
            </div>
              <Link to="/" onClick={() => cerrarSesion(setAuth)}>
                <Button className="alert padding" buttonText={"Cerrar Sesión"} />
              </Link>
              <img src="src/images/hand.png" alt="HandZombie" className="itemHeader"/>
          </div>
      </div>
    </>
  );
}

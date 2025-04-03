import { useContext } from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { userContext } from "../context/UserContext";
import { cerrarSesion } from "../utilities/helper";

export default function Profile() {
  const { auth, setAuth } = useContext(userContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data));
    }
  }, []);

  const email = auth.autenticado ? auth.autenticado.email : "";

  return (
    <>
      <div className="card2">
        <div
          className="white column flex"
          style={{ justifyContent: "space-between", gap: "3rem" }}
        >
          <h1 className="flex">R.I.P</h1>
          {auth.autorizado ? (
            <>
              <div className="account">
                <p>Perfil Zombie</p>
                <Button
                  className="perfil"
                  buttonText={`${email}`}
                  buttonImg={" "}
                />
              </div>
              <Link to="/">
                <Button
                  className="alert padding"
                  buttonText={"Cerrar Sesión"}
                  onClick={() => cerrarSesion(setAuth)}
                />
              </Link>
            </>
          ) : (
            <h1>No Logueado</h1>
          )}
          <img
            src="src/images/hand.png"
            alt="HandZombie"
            className="itemHeader"
          />
        </div>
      </div>
    </>
  );
}

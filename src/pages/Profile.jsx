import { useContext } from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { userContext } from "../context/UserContext";

export default function Profile() {
  const { auth, setAuth, user, cerrarSesion  } = useContext(userContext);

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
                  buttonText={`${user?.email}`}
                  buttonImg={" "}
                />
              </div>
              <Link to="/">
                <Button
                  className="alert padding"
                  buttonText={"Cerrar Sesión"}
                  onClick={() => cerrarSesion()}
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

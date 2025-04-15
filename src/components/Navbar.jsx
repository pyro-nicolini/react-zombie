import { Link, NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import Button from "./Button";
import Promo from "./Promo";
import { pricer } from "../utilities/helper";
import { useContext } from "react";

import { userContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";


const Navbar = () => {
  const { auth, setAuth, cerrarSesion } = useContext(userContext);
  const { autorizado, autenticado } = auth || {};
  const { totalisimo, promo } = useContext(CartContext);

  const setActiveClass = ({ isActive }) => (isActive ? "active" : "navLink");

  const email = autenticado ? autenticado.email : "";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("transparent");
    } else {
      navbar.classList.remove("transparent");
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("scroll", handleScroll);
  });

  return (
    <div className="fixed">
      <NavLink to="/cart" style={{ textDecoration: "none" }}>
        <Promo promo={promo.movistar.promocion} />
      </NavLink>
      <nav className="nav" id="navbar">
        <NavLink to="/">
          <img src={logo} alt="logo" className="navLogo" />
        </NavLink>
        {autorizado ? (
          <NavLink to="/profile">
            <div className="account">
              <div className="flex">
                <div className="online">
                  <div className="icon"> </div>Conectado
                </div>
                <Button
                  className="perfil"
                  buttonText={`${email}`}
                  buttonImg={" "}
                />
              </div>
            </div>
          </NavLink>
        ) : null}
        <div className="menu">
          <NavLink to="/" className={setActiveClass}>
            HOME
          </NavLink>
          {autorizado ? (
            <>
              <Button
                className="alert padding"
                buttonText={"Cerrar Sesión"}
                onClick={() => cerrarSesion()}
              />
            </>
          ) : (
            <>
              <NavLink to="/login" className={setActiveClass}>
                Iniciar Sesión
              </NavLink>
              <NavLink to="/register" className={setActiveClass}>
                Registrar
              </NavLink>
            </>
          )}
          <div className="info">
            <NavLink to="/pizzas/p001" className={setActiveClass}>
              Pizzas
            </NavLink>
            <NavLink to="/cart" className={setActiveClass}>
              Carrito
            </NavLink>
          </div>
        </div>
        <NavLink to="/cart">
          <Button
            buttonText={`🛒 Total: ${pricer(totalisimo)}`}
            className="total"
          />
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;

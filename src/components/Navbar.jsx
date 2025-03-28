import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import Button from "./Button";
import Promo from "./Promo";
import { pricer } from "../utilities/helper";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

import { cerrarSesion } from "../utilities/helper";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { autorizado, autenticado } = auth || {};
  const { totalisimo, promo } = useContext(CartContext);

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
      <Link to="/cart" style={{textDecoration: 'none',}}>
        <Promo promo={promo.movistar.promocion} />
      </Link>
      <nav className="nav" id="navbar">
        <Link to="/">
          <img src={logo} alt="logo" className="navLogo" />
        </Link>
        {autorizado ? (
          <Link to="/profile">
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
          </Link>
        ) : null}
        <div className="menu">
          <Link to="/" className="navLink">
            <Button buttonText={"HOME"} className="navLink" />
          </Link>
          {autorizado ? (
            <>
              <Link to="/" onClick={() => cerrarSesion(setAuth)}>
                <Button className="navLink red" buttonText={"Cerrar Sesión"} />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="navLink" buttonText={"Iniciar Sesión"} />
              </Link>
              <Link to="/register">
                <Button className="navLink" buttonText={"Registrar"} />
              </Link>
            </>
          )}
          <div className="info">
            <Link to="/pizza/p001">
              <Button className="navLink" buttonText={"Pizzas"} />
            </Link>
            <Link to="/404">
              <Button className="navLink" buttonText={"NotFound"} />
            </Link>
            <Link to="/cart">
              <Button className="navLink" buttonText={"Carrito"} />
            </Link>
          </div>
        </div>
        <Link to="/cart">
          <Button
            buttonText={`🛒 Total: ${pricer(totalisimo)}`}
            className="total"
          />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;

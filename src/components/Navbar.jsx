import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import Button from "./Button";
import Promo from "./Promo";

const Navbar = ({ onLogout, auth, total }) => {
  const { autorizado, autenticado } = auth || {};

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
      <Promo
        promo={
          "35% OFF con MOVISTAR ❤️ Excluye promos, combos y Holy Cheese. Mínimo de compra $10.000, descuento máximo $12.000.*"
        }
      />
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
              <Link to="/" onClick={onLogout}>
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
        {autorizado ? (
          <Link to="/cart">
            <Button
              buttonText={`🛒 Total: ${Math.round(total * 1000).toLocaleString(
                "es-CL",
                {
                  style: "currency",
                  currency: "CLP",
                }
              )}`}
              className="total"
            />
          </Link>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;

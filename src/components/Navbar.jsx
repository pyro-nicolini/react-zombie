import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import Button from "../components/Button";

const Navbar = ({ onLogout, auth, total }) => {
  const { autorizado, autenticado } = auth || {};

  const email = autenticado ? autenticado.email : "";

  return (
    <div className="fixed">
      <div className="nav" id="navbar">
        <Link to="/">
          <img src={logo} alt="logo" className="navLogo" />
        </Link>
        {autorizado ? (
          <Link to="/profile">
            <div className="account">
              <p className="online">
                <div className="icon"> </div>Conectado
              </p>
              <Button
                className="perfil"
                buttonText={`${email}`}
                buttonImg={" "}
              />
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
      </div>
    </div>
  );
};

export default Navbar;

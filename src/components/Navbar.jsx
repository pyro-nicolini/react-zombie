import Button from "./Button";
import logo from "../images/logo2.png";
import Promo from "./Promo.jsx";

const Navbar = ({ onLogout, auth, total }) => {
  const { autorizado, autenticado } = auth || {};

  const email = autenticado ? autenticado.email : "";

  window.addEventListener("scroll", function () {
    let navbar = document.getElementById("navbar");

    if (window.scrollY > 50) {
      navbar.classList.add("transparent");
    } else {
      navbar.classList.remove("transparent");
    }
  });

  return (
    <div className="fixed">
      <Promo
        promo={
          "35% OFF con MOVISTAR ❤️ Excluye promos, combos y Holy Cheese. Mínimo de compra $10.000, descuento máximo $12.000.*"
        }
      />
      <div className="nav" id="navbar">
        <img src={logo} alt="logo" className="navLogo" />
        {autorizado ? (
          <div className="account">
            <p>Perfil</p>
            <Button
              className="perfil"
              buttonText={`${email}`}
              buttonImg={" "}
            />
          </div>
        ) : null}
        <div className="menu">
          <Button buttonText={"Inicio"} className="navLink" />
          {autorizado ? (
            <>
              <Button
                onClick={onLogout}
                className="navLink red"
                buttonText={"Cerrar Sesión"}
              />
            </>
          ) : (
            <>
              <Button className="navLink" buttonText={"Iniciar Sesión"} />
              <Button className="navLink" buttonText={"Registrar"} />
            </>
          )}
          <div className="info">
            <Button className="navLink" buttonText={"Sucursales"} />
            <Button className="navLink" buttonText={"Promos"} />
          </div>
        </div>
        <Button
          buttonText={`Total: ${Math.round(total*1000).toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}`}
          className="total"
        />
      </div>
    </div>
  );
};

export default Navbar;

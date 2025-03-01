import Button from "./Button";
import logo from "../images/logo.png";
import buttonImg from "../images/take.png";

const Navbar = ({ onLogout, auth }) => {
  const total = 25000;
  const { autorizado, autenticado } = auth || {};
  const email = autenticado ? autenticado.email : "";

  return (
    <div className="navbar">
        <img src={logo} alt="Logo" className="navLogo"/>
      <div className="NavLinks">
        {autorizado ? (
          <div className="bienvenido">
            <p>{`Bienvenido`}</p>
            <span>{` ${email}`}</span>
          </div>
        ) : null}
        <Button buttonText={"🍕 Home"} className="navLink" />
        {autorizado ? (
          <>
            <Button className="navLink" buttonText={"👤 Profile"}/>
            <Button
              onClick={onLogout}
              className="navLink red"
              buttonText={"🔒 Logout"}
            />
          </>
        ) : (
          <>
            <Button className="navLink" buttonText={"🔐 Login"} />
            <Button className="navLink" buttonText={"📝 Register"} />
          </>
        )}
      </div>
      <Button
        buttonText={`Total: ${total.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}`}
        className="total"
        buttonImg={buttonImg}
      />
    </div>
  );
};

export default Navbar;

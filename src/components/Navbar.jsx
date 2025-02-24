import Button from "./Button";

const Navbar = ({ onLogout, auth }) => {
  const total = 25000;
  const { autorizado, autenticado } = auth || {};
  const email = autenticado ? autenticado.email : '';

  return (
    <nav className="gap-1">
      <div className="d-flex gap-2">
        <Button buttonText={"🍕 Home"} className="btn-outline-light" />
        
        {autorizado ? (
          <>
            <Button buttonText={`Bienvenido ${email}`} className="btn-warning" />
            <Button className="btn-outline-light" buttonText={"🔓 Profile"} />
            <Button onClick={onLogout} className="btn-danger" buttonText={"🔒 Logout"} />
          </>
        ) : (
          <>
            <Button className="btn-outline-light" buttonText={"🔐 Login"} />
            <Button className="btn-outline-light" buttonText={"🔐 Register"} />
          </>
        )}
      </div>

      <Button
        buttonText={`🛒 Total: ${total.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}`}
        className="btn-outline-success"
      />
    </nav>
  );
};

export default Navbar;

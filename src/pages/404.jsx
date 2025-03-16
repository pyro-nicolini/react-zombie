import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="white">
      <h1>404</h1>
      <h2>Página no encontrada</h2>

      <Link to="/">
        <Button className="button total" buttonText={"Volver al Home"} />
      </Link>
    </div>
  );
}

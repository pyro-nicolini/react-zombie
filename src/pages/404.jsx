import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="white error404">
      <img style={{height: '14rem'}} src="src/images/zombipizza.png" alt="" />
      <h1>Not Found 404 </h1>
      <h3>Página no encontrada</h3>
      <Link to="/">
        <Button className="button promoBtn" buttonText={"Volver al Home"} />
      </Link>
    </div>
  );
}

import Button from "./Button";
import ytImage from "../images/yt.png";

function CardPizza({ name, price, ingredients = [], img, desc }) {
  function capitalizer(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function pricer(num) {
    return num.toLocaleString().replace(",", ".");
  }

  return (
      <div className="cardBody">
        <div className="cardWindows">
          <img
            className="cardImg"
            src={img}
            alt={name}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <Button
            buttonText={
              <>
                <img
                  className="ytImage"
                  src={ytImage}
                  alt="YouTube"
                />
                <span>Más...</span>
              </>
            }
            className="verMas"
          />
        </div>
        <h2 className="cardTitle">{capitalizer(name)}</h2>
        <h4 className="cardSubTitle">
          {capitalizer(ingredients?.join(", ") || "No disponible")}
        </h4>
        <p className="cardText">{desc}</p>
        <div style={{display: 'flex', justifyContent: "space-evenly"}}>
        <h3 className="cardPrice">${pricer(price)}</h3>
        <Button buttonText="Añadir 🛒" className="bg-danger text-white" />
        </div>
      </div>
  );
}

export default CardPizza;

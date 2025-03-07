import Button from "./Button";
import ytImage from "../images/yt.png";

function CardPizza({ name, price, ingredients = [], img2, desc, img }) {
  function capitalizer(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function pricer(num) {
    return num.toLocaleString().replace(",", ".");
  }

  return (
    <div className="cardBody" style={{ backgroundImage: `url(${img})` }}>
      <img className="zombie" src={img2} alt={name} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <p className="cardPrice">${pricer(price)}</p>
        <div className="cardWindows">
          <h2 className="cardTitle">{capitalizer(name)}</h2>
          <h4 className="cardSubTitle">
            {capitalizer(ingredients?.join(", ") || "No disponible")}
          </h4>

          <p className="cardText">{desc}</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Button buttonText="Añadir 🍕" className="add" />
          <Button
            buttonText={
              <>
                <img className="youtube" src={ytImage} alt="YouTube" />
                <span>Ver Más</span>
              </>
            }
            className="mas"
          />
        </div>
      </div>
    </div>
  );
}

export default CardPizza;

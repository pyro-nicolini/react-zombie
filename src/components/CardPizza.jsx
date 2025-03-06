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
      <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', gap: '1rem',}}>
        <p className="cardPrice">${pricer(price)}</p>
      <div className="cardWindows">
        <h2 className="cardTitle">{capitalizer(name)}</h2>
        <img className="zombie" src={img2} alt={name} />
        <h4 className="cardSubTitle">
          {capitalizer(ingredients?.join(", ") || "No disponible")}
        </h4>

        <p className="cardText">{desc}</p>
      </div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: 'center', }}>

        <Button buttonText="Añadir 🍕" className="agregar" />
        <Button
          buttonText={
            <>
              <img className="ytImage" src={ytImage} alt="YouTube" />
              <span>Ver Más</span>
            </>
          }
          className="verMas"
          />
          </div>
      </div>
    </div>
  );
}

export default CardPizza;

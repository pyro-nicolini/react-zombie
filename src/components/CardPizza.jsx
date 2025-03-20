import Button from "./Button";
import ytImage from "../images/yt.png";
import { Link } from "react-router-dom";
import { capitalizer, pricer } from "../utilities/helper"

function CardPizza({ name, price, ingredients, img2, desc, img }) {
  const pizzaEmojis = [
    "🧀", // Mozzarella
    "🍅", // Tomates
    "🍖", // Jamón
    "🌿", // Orégano
    "🌭", // Choricillo
    "🍕", // Salame
    "🍄", // Champiñones
    "🥓", // Bacon
    "🌶️", // Pimientos
    "🍗", // Pollo grillé
  ];
 

  return (
    <div className="cardBody" style={{ backgroundImage: `url(${img})` }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <img className="zombie" src={img2} alt={name} />
      </div>

      <p className="cardPrice">${pricer(price)}</p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignContent: "center",
          marginBottom: ".7rem",
          margin: "auto",
        }}
      >
        <Link to="/cart">
          <Button buttonText="Añadir 🍕" className="cardAdd" />
        </Link>
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
      <div className="cardWindows">
        <h2 className="cardTitle">{capitalizer(name)}</h2>
        <h4 className="cardSubTitle">
          <div className="flex">
            {ingredients.map((element, i) => (
              <div key={`${element}-${i}`} className="ingredient">
                <p>{pizzaEmojis[i]}</p>
                <p>{capitalizer(element)}</p>
              </div>
            ))}
          </div>
        </h4>

        <p className="cardText">{desc}</p>
      </div>
    </div>
  );
}

export default CardPizza;

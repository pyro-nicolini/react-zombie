import Button from "./Button";
import ytImage from "../images/yt.png";
import { Link } from "react-router-dom";

function CardPizza({ name, price, ingredients, img2, desc, img }) {
  function capitalizer(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function pricer(num) {
    return num.toLocaleString().replace(",", ".");
  }

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
      <div className="cardWindows">
        <h2 className="cardTitle">{capitalizer(name)}</h2>
        <h4 className="cardSubTitle">
          <ol>
            {ingredients.map((element, i) => {
              return <li key={element}>{capitalizer(element)}</li>;
            })}
          </ol>
        </h4>

        <p className="cardText">{desc}</p>
      </div>
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
          <Button buttonText="Añadir 🍕" className="add" />
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
    </div>
  );
}

export default CardPizza;

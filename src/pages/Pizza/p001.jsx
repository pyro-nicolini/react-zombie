import { useState, useEffect, useContext } from "react";
import Button from "../../components/Button";
import { CartContext } from "../../context/CartContext";
import { pricer, capitalizer } from "../../utilities/helper";

export default function Pizza({}) {
  const [optionId, setOptionId] = useState("p001");
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addPizza, stock } = useContext(CartContext);


  const getPizza = async () => {
    if (!optionId) return;
    setLoading(true);
    setError(false);
    try {
      const url_id = `http://localhost:5000/api/pizzas/${optionId}`;
      const response = await fetch(url_id);
      if (!response.ok) throw new Error("Error de respuesta de Pizza");
      const data = await response.json();
      setPizza(data);
    } catch (e) {
      setError(true);
      console.error("Error al obtener la pizza:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPizza();
  }, [optionId]);

  const pizzaStock = stock.find((p) => p.id.toLowerCase() === pizza?.id.toLowerCase());

  return (
    <div>
      <div style={{ width: "20rem", margin: "auto"}}>
        <label htmlFor="optionId" className="white">Buscador de pizzas:</label>
        <select value={optionId} onChange={(e) => setOptionId(e.target.value)}>
          <option value="">Selecciona una pizza</option>
          <option value="p001">Napolitana</option>
          <option value="p002">Española</option>
          <option value="p003">Salame</option>
          <option value="p004">Cuatro estaciones</option>
          <option value="p005">Bacon</option>
          <option value="p006">Pollo picante</option>
        </select>
      </div>

      {loading && (
        <div className="column">
          <img src="../src/images/logo.png" className="spinner" alt="Cargando..." />
          <p className="white" style={{ position: "relative", top: "-1rem" }}>
            <strong>{"Invadiendo..."}</strong>
          </p>
        </div>
      )}
      {error && <h2 className="white">Error: los Zombiez se comieron al repartidor</h2>}
      {!loading && pizza && (
        <div key={pizza.id} className="card2">
          <div className="cardDiv2">
            <img className="cardImg2" src={pizza.img} alt={pizza.name} />
            <h2 className="cardPrice2">{pricer(pizza.price)}</h2>
            <Button
              buttonText={pizzaStock && pizzaStock.stock > 0 ? "Agregar al carrito" : "Sin Stock"}
              className="cardAdd"
              onClick={() => addPizza(pizza.id)}
            />
          </div>
          <div>
            <h1 className="cardTitle">{capitalizer(pizza.name)}</h1>
            <p className="cardSubTitle">
              Ingredientes: {capitalizer(pizza.ingredients.join(", "))}
            </p>
            <p className="cardText">{pizza.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
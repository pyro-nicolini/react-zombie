import { useState, useEffect } from "react";
import Button from "./Button";

export default function Pizza({ loading, error, setLoading, setError }) {
  const [optionId, setOptionId] = useState("p001");
  const [pizza, setPizza] = useState(null);

  function capitalizer(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function pricer(num) {
    return num.toLocaleString().replace(",", ".");
  }

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
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    getPizza();
  }, [optionId]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        gap: "2rem",
        margin: "auto",
      }}
    >
      <div>
        <div style={{ width: "20rem", margin: "auto", textAlign: "center" }}>
          <label htmlFor="optionId" className="white">
            Buscador de pizzas:
          </label>
          <select
            value={optionId}
            onChange={(e) => setOptionId(e.target.value)}
          >
            <option value="">Selecciona una pizza</option>
            <option value="p001">Napolitana</option>
            <option value="p002">Española</option>
            <option value="p003">Salame</option>
            <option value="p004">Cuatro estaciones</option>
            <option value="p005">Bacon</option>
            <option value="p006">Pollo picante</option>
          </select>
        </div>

        <div className="contenedorPizza">
          {loading && (
            <>
              <img
                src="src/images/logo.png"
                className="spinner"
                alt="Cargando..."
              />
              <p
                className="white"
                style={{ position: "relative", top: "-1rem" }}
              >
                <strong>{"Invadiendo..."}</strong>
              </p>
            </>
          )}
          {error && <div>Error: los Zombiez se comieron al repartidor</div>}
          {!loading && pizza && (
            <div
              key={pizza.id}
              className="cardB"
              style={{
                maxWidth: "40rem",
                margin: "2rem auto",
                padding: "0",
                paddingBottom: "0",
              }}
            >
              <div className="" style={{ margin: "0" }}>
                <img className="cardImg2" src={pizza.img} alt={pizza.name} />
                <h2 className="price">${pricer(pizza.price)}</h2>
                <Button
                  buttonText="Agregar al carrito"
                  className="add"
                  onClick={() => console.log("Agregar a carrito")}
                />
              </div>
              <div>
                <h1 className="cardTitle">{capitalizer(pizza.name)}</h1>
                <p className="cardSubTitle">
                  Ingredientes: {capitalizer(pizza.ingredients.join(", "))}
                </p>
                <p className="pizzaText">{pizza.desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

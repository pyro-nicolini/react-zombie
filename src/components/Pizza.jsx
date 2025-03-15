import { useState, useEffect } from "react";

function Pizza() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
      console.log("Buscando el Queso...");
    } catch (e) {
      console.error("Error al obtener la pizza:", e);
      setError(true);
      setLoading(false);
    } finally {
      if (!error) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  };
  
  useEffect(() => {
      getPizza();
  }, [optionId]);

  return (
    <>
      <div style={{ width: "20rem", margin: "auto", textAlign: "center" }}>
        <label htmlFor="optionId" className="white">
          Buscador de pizzas:
        </label>
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

      <div className="contenedorPizza">
        {loading && <img src="src/images/logo.png" className="spinner"/>}
        {error && <div>Error: los Zombiez se comieron al repartidor</div>}
        {!loading && pizza && (
          <div
            key={pizza.id}
            className="cardBody"
            style={{
              maxWidth: "20rem",
              margin: "2rem auto",
              padding: "0",
              paddingBottom: "0",
            }}
          >
            <div className="cardWindowsB" style={{ margin: "0" }}>
              <img className="cardImg" src={pizza.img} alt={pizza.name} />
              <h1 className="cardTitle">{capitalizer(pizza.name)}</h1>
              <h2 className="">Precio: ${pricer(pizza.price)}</h2>
              <p className="cardSubTitle">
                Ingredientes: {capitalizer(pizza.ingredients.join(", "))}
              </p>
              <p className="cardText">{pizza.desc}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Pizza;

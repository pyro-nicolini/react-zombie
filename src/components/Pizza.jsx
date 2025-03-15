import { useState, useEffect } from "react";

function Pizza() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [optionId, setOptionId] = useState("p001");
  const [pizza, setPizza] = useState(null);

  function capitalizer(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function pricer(num) {
    return num.toLocaleString().replace(",", ".");
  }

  /* preparo una lista con todas las pizzas para generar las opciones y no ponerlas manualmente */
  const getData = async () => {
    try {
      const url = `http://localhost:5000/api/pizzas/`;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("Error de respuesta, los Zombiez se comieron el WiFi");
      const data = await response.json();
      setPizzas(data);
      console.log("Encendiendo hornos...");
    } catch (e) {
      console.error("Error al obtener las pizzas:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  /* según la opción elegida se cargará la pizza seleccionada de la API */
  const getPizza = async () => {
    if (!optionId) return;
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
    }
  };
  useEffect(() => {
    getPizza();
  }, [optionId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: los Zombiez se comieron al repartidor</div>;

  return (
    <>
      <div style={{ width: "20rem", margin: "auto", textAlign: "center" }}>
        <label htmlFor="optionId" className="white">
          Buscador de pizzas:
        </label>
        <select value={optionId} onChange={(e) => setOptionId(e.target.value)}>
          <option value="">Selecciona una pizza</option>
          {pizzas.map((pizza) => (
            <option key={pizza.id} value={pizza.id}>
              {capitalizer(pizza.name)}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          margin: "2rem auto",
        }}
      >
        {pizza && (
          <div
            key={pizza.id}
            className="cardBody"
            style={{ maxWidth: "20rem", backgroundImage: `url(${pizza.img})` }}
          >
            <img className="cardImg" src={pizza.img} alt={pizza.name} />
            <p className="cardPrice">Precio: ${pricer(pizza.price)}</p>
            <div className="cardWindows">
              <h1 className="cardTitle">{capitalizer(pizza.name)}</h1>
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

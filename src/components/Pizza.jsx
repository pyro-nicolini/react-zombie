import { useState, useEffect } from "react";

function Pizza() {
  const [pizza, setPizza] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  function capitalizer(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function pricer(num) {
    return num.toLocaleString().replace(",", ".");
  }
 
  const getData = async () => {
    try {
      const url = "http://localhost:5000/api/pizzas/p001"; // Asumiendo que tienes esta URL disponible.
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("Error de respuesta, los Zombiez se comieron el WiFii");
      const data = await response.json();
      setPizza(data);
      console.log("Encendiendo hornos...");
    } catch (e) {
      console.error("Error al obtener la pizza:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: los Zombiez se comieron al repartidor</div>;
  }

  return (
    <div className="cardBody">
      <div className="cardWindows">
          <h1 className="cardTitle">{capitalizer(pizza.name)}</h1>
          <p className="cardText">{pizza.desc}</p>
          <p className="cardSubTitle">ingredientes: ${pizza.ingredients}</p>

          <p className="cardPrice">Precio: ${pizza.price}</p>
          <img className="zombie" src={pizza.img} alt={pizza.name} />
      </div>
    </div>
  );
}

export default Pizza;

import { useState, useEffect, useContext } from "react";
import CardPizza from "./CardPizza";
import { pizzasJS } from "../data/pizzas";
import { CartContext } from "../context/CartContext";

export default function AllPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addPizza } = useContext(CartContext)

  const getData = async () => {
    setLoading(true);
    setError(false);
    try {
      const url = "http://localhost:5000/api/pizzas";
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
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading && (
        <div className="column">
          <img
            src="src/images/logo.png"
            alt="Cargando..."
            className="spinner"
          />
          <p className="white">
            <strong>Invadiendo...</strong>
          </p>
        </div>
      )}

      {error && (
        <h2 className="white">Error: los Zombiez se comieron el WiFi</h2>
      )}

      {!loading && !error && pizzas.length === 0 && (
        <h2 className="white">No hay promociones disponibles en este momento.</h2>
      )}

      <div className="pizzas">
        {!loading &&
          pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id} // Asegúrate de que cada pizza tenga un ID único
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              desc={pizza.desc}
              img={pizza.img}
              img2={
                pizzasJS.find(
                  (zom) =>
                    zom.id.toLocaleLowerCase() === pizza.id.toLocaleLowerCase()
                )?.zombie || "nohay"
              }
              id={pizza.id}
              onClick={() => addPizza(pizza.id)}
            />
          ))}
      </div>
    </>
  );
}

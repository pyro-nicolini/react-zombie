import { useState, useEffect, useContext, useNavigate } from "react";
import CardPizza from "./CardPizza";
import { pizzasJS } from "../data/pizzas";
import { CartContext } from "../context/CartContext";

export default function AllPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addPizza, stock, cartMsg } = useContext(CartContext);

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
        <h2 className="white">
          No hay promociones disponibles en este momento.
        </h2>
      )}

      <div className="pizzas">
        {cartMsg && <strong className="exito modal">{cartMsg}</strong>}
        {!loading &&
          pizzas.map((pizza) => {
            const pizzaStock = stock.find(
              (p) => p.id.toLowerCase() === pizza.id.toLowerCase()
            );
            const botonAnadir =
              pizzaStock.stock > 0 ? "Añadir Pizza" : `Sin Stock`;
            return (
              <CardPizza
                key={pizza.id}
                name={pizza.name}
                price={pizza.price}
                ingredients={pizza.ingredients}
                desc={pizza.desc}
                img={pizza.img}
                img2={
                  pizzasJS.find(
                    (zom) =>
                      zom.id.toLocaleLowerCase() ===
                      pizza.id.toLocaleLowerCase()
                  )?.zombie || "nohay"
                }
                idx={pizza.id}
                onClick1={() => addPizza(pizza.id)}
                botonAnadir={botonAnadir}
                id={pizza.id}
              />
            );
          })}
      </div>
    </>
  );
}

import { useState, useEffect } from "react";

function Pizza() {
  const [pizzas, setPizzas] = useState([]); // Inicia como array vacío
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("salame");

  function capitalizer(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function pricer(num) {
    return num.toLocaleString().replace(",", ".");
  }

  const getData = async () => {
    try {
      const id = 'p001'
      const url = "http://localhost:5000/api/pizzas"; // Ajusta la URL según tu API
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error de respuesta, los Zombiez se comieron el WiFi");
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
    const timer = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtrado de datos
  const results = search
    ? pizzas.filter((pizza) =>
        pizza.name.toLowerCase().includes(search.toLowerCase())
      )
    : pizzas;

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: los Zombiez se comieron al repartidor</div>;



  return (
    <>
        <div style={{width: '20rem', margin: 'auto'}}>
        <label htmlFor="search" className="white">Buscador de pizza:</label>
        <input
          id="search"
          type="text"
          placeholder="Escribe el nombre..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      <button onClick={() => setSearch("")} className="total">Limpiar</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', margin: '2rem auto'}}>
        {results.map((pizza) => (
          <div key={pizza.id} className="cardBody" style={{maxWidth: '20rem'}}>
            <img className="cardImg" src={pizza.img} alt={pizza.name} />
              <p className="cardPrice">Precio: ${pricer(pizza.price)}</p>
            <div className="cardWindows">
              <h1 className="cardTitle">{capitalizer(pizza.name)}</h1>
              <p className="cardSubTitle">Ingredientes: {pizza.ingredients.join(", ")}</p>
              <p className="cardText">{pizza.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Pizza;

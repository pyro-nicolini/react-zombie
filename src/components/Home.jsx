import { useState, useEffect } from "react";
import Header from "./Header";
import CardPizza from "./CardPizza";
import { pizzasJS } from "../data/pizzas";
import fondoPizza from "../images/fondopizza.webp";
import Pizza from "./Pizza"

function Home() {
  const texts = [
    {
      title: "¡Pizzas de ultratumba!",
      description:
        "Crujientes, aterradoras y deliciosas... ¿Te atreves a probarlas?",
    },
    {
      title: "¡Terror en cada bocado!",
      description:
        "Nuestras pizzas zombies reviven el hambre... ¡No te resistas!",
    },
    {
      title: "¡Muerde antes de que te muerdan!",
      description:
        "Sabor monstruoso, calidad infernal... ¡Pide la tuya antes del amanecer!",
    },
  ];

  const [index, setIndex] = useState(0);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);


    const getData = async () => {
      try {
        const url = "http://localhost:5000/api/pizzas";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Errozr de rezpuesta, loz Zombiez sze comieron el wiFii");
        const data = await response.json();
        setPizzas(data);
        console.log('Encendiendo hornos...')
      } catch (e) {
        console.error("Error al obtener las pizzas:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

  
    useEffect(() => {
      const timer = setTimeout(()=> {
        getData();
      }, 1000);
      return () => clearTimeout(timer);
     }, []);


  if (loading) {
    return <Header title1="Cargando... " fondo={fondoPizza} />;
  }

  if (error) {
    return <Header title1="Error loz Zombiez sze comieron al repartidor" fondo={fondoPizza} />;
  }

  return (
    <div className="home">
      <Pizza />
      <Header
        title1={texts[index].title}
        description1={texts[index].description}
        fondo={fondoPizza}
      />
      <div className="containerPizza">
        <div className="pizzas">
          {pizzas.length === 0 ? (
            <p>No hay pizzas disponibles</p>
          ) : (
            pizzas.map((pizza) => (
              <CardPizza
                key={pizza.id}
                name={pizza.name}
                price={pizza.price}
                ingredients={pizza.ingredients}
                desc={pizza.desc}
                img={pizza.img}
                img2={pizzasJS.find((zom) => zom.id.toLocaleLowerCase() === pizza.id.toLocaleLowerCase())?.zombie || "nohay"}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

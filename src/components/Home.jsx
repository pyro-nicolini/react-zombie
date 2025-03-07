import { useState, useEffect } from "react";
import Header from "./Header";
import CardPizza from "./CardPizza";
import { pizzas } from "../data/pizzas";
import fondoPizza from "../images/fondopizza.webp";

function Home() {
  const texts = [
    {
      title: "¡Pizzas de ultratumba!",
      description: "Crujientes, aterradoras y deliciosas... ¿Te atreves a probarlas?",
    },
    {
      title: "¡Terror en cada bocado!",
      description: "Nuestras pizzas zombies reviven el hambre... ¡No te resistas!",
    },
    {
      title: "¡Muerde antes de que te muerdan!",
      description: "Sabor monstruoso, calidad infernal... ¡Pide la tuya antes del amanecer!",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <Header
        title1={texts[index].title}
        description1={texts[index].description}
        fondo={fondoPizza}
      />

      <div className="containerPizza">
        <div className="pizzas">
          {pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              desc={pizza.desc}
              img={pizza.img}
              img2={pizza.zombie}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

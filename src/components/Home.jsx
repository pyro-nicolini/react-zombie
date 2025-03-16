import { useState, useEffect } from "react";
import Header from "./Header";
import fondoPizza from "../images/fondopizza.webp";
import Pizza from "./Pizza";
import Button from "./Button";
import { Link } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div className="twins column">
        <h1 className="white">¿Qué vamos a pedir hoy?</h1>
        <Link to="/promos">
          <Button buttonText={"Ver Promos"} className="total" />
        </Link>
      </div>
      <Pizza
        loading={loading}
        error={error}
        setLoading={setLoading}
        setError={setError}
      />
      <Header
        title1={texts[index].title}
        description1={texts[index].description}
        fondo={fondoPizza}
      />
    </div>
  );
}

export default Home;

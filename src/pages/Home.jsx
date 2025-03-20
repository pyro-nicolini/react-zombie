import { useState, useEffect } from "react";
import Header from "../components/Header";
import fondoPizza from "../images/fondopizza.webp";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="home">
        <Header
          title1={texts[index].title}
          description1={texts[index].description}
          fondo={fondoPizza}
        />
      </div>
      <div className="hero">
        <img src={logo} alt="logo" className="navLogo2" style={{height: '13rem'}} />
        <h1 className="white">¿Qué vamos a pedir hoy?</h1>
        <Link to="/allpizzas">
          <Button buttonText={"Ver Promos"} className="promoBtn" />
        </Link>
      </div>
    </>
  );
}

export default Home;

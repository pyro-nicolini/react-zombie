import Header from "./Header";
import CardPizza from "./CardPizza";
import { pizzas, pizzaCart } from "../data/pizzas";
import fondoPizza from '../images/fondopizza.webp'

function Home() {
  return (
    <div className="home">
      <Header
        title={"¡Pizzas de miedo!"}
        description={"¡Tenemos las mejores pizzas que podrás encontrar!"}
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

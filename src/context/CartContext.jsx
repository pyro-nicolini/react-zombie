import { createContext, useState, useEffect } from "react";
import { pizzasJS } from "../data/pizzas";


export const CartContext = createContext();

const CartProvider = ({ children }) => {

const [pizzaList, setPizzaList] = useState(pizzasJS)
const [totalisimo, setTotalisimo] = useState(0);
const [pizzaCart, setPizzaCart] = useState([
    {
      id: "P001",
      name: "napolitana",
      price: 5950,
      count: 1,
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_cl.jpg?alt=media&token=6a9a33da-5c00-49d4-9080-784dcc87ec2c",
    },
    {
      id: "P002",
      name: "española",
      price: 7250,
      count: 1,
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab",
    },

  ]);
  function addPizza(id) {
    setPizzaCart((prevPizzas) => {
      const pizzaEncontrada = pizzaList.find((pizza) => pizza.id === id);
      if (pizzaEncontrada) {
        const pizzaExists = prevPizzas.some((pizza) => pizza.id === pizzaEncontrada.id);
        if (pizzaExists) {
          return prevPizzas.map((pizza) =>
            pizza.id === pizzaEncontrada.id ? { ...pizza, count: pizza.count + 1 } : pizza
          );
        } else {
          return [...prevPizzas, { ...pizzaEncontrada, count: 1 }];
        }
      } else {
        return prevPizzas;
      }
    });
  }
  function deletePizza(id) {
    setPizzaCart((prevPizzas) => {
      return prevPizzas.map((pizza) =>
        pizza.id === id && pizza.count > 0
          ? { ...pizza, count: pizza.count - 1 }
          : pizza
      );
    });
  }



  useEffect(() => {
    let total = pizzaCart.reduce(
      (acc, pizza) => acc + pizza.price * pizza.count,
      0
    );
    setTotalisimo(total);
  }, []);

  return (
    <CartContext.Provider
      value={{ pizzaCart, setPizzaCart, totalisimo, setTotalisimo, pizzaList, addPizza, deletePizza}}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;

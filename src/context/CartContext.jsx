import { createContext, useState, useEffect } from "react";
import { pizzasJS } from "../data/pizzas";
import { pricer } from "../utilities/helper";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [pizzaList, setPizzaList] = useState(pizzasJS);
  const [totalisimo, setTotalisimo] = useState(0);
  const [pizzaCart, setPizzaCart] = useState([]);
  const [cupon, setCupon] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  const [newTotal, setNewTotal] = useState(0); // Nueva variable para almacenar el total después del descuento

  function addPizza(id) {
    setPizzaCart((prevPizzas) => {
      const pizzaEncontrada = pizzaList.find((pizza) => pizza.id.toLowerCase() === id.toLowerCase());
      if (!pizzaEncontrada) return prevPizzas;

      const pizzaExists = prevPizzas.find((pizza) => pizza.id.toLowerCase() === pizzaEncontrada.id.toLowerCase());

      if (pizzaExists) {
        return prevPizzas.map((pizza) =>
          pizza.id.toLowerCase() === pizzaEncontrada.id.toLowerCase() ? { ...pizza, count: pizza.count + 1 } : pizza
        );
      } else {
        return [...prevPizzas, { ...pizzaEncontrada, count: 1 }];
      }
    });
  }

  function deletePizza(id) {
    setPizzaCart((prevPizzas) =>
      prevPizzas
        .map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
        )
        .filter((pizza) => pizza.count > 0)
    );
  }

  useEffect(() => {
    const total = pizzaCart.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0);
    const newTotalCalculated = total - descuentoAplicado;
    setNewTotal(newTotalCalculated);
    setTotalisimo(pricer(newTotalCalculated));
  }, [pizzaCart, descuentoAplicado]);

  return (
    <CartContext.Provider
      value={{
        pizzaCart,
        setPizzaCart,
        totalisimo,
        setTotalisimo,
        pizzaList,
        addPizza,
        deletePizza,
        descuentoAplicado,
        setDescuentoAplicado,
        cupon,
        setCupon,
        newTotal,
        setNewTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

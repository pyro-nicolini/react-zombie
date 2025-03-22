import { createContext, useState, useEffect } from "react";
import { pizzasJS } from "../data/pizzas";
import { pricer } from "../utilities/helper";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [listaDeProductos, setListaDeProductos] = useState(pizzasJS);
  const [totalisimo, setTotalisimo] = useState(0);
  const [carro, setCarro] = useState([]);
  const [stock, setStock] = useState([])
  const [cupon, setCupon] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  const [newTotal, setNewTotal] = useState(0); // Nueva variable para almacenar el total después del descuento

  function addPizza(id) {
    setCarro((prevPizzas) => {
      const pizzaEncontrada = listaDeProductos.find((pizza) => pizza.id.toLowerCase() === id.toLowerCase());
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
    setCarro((prevPizzas) =>
      prevPizzas
        .map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
        )
        .filter((pizza) => pizza.count > 0)
    );
  }

  
  useEffect(() => {
    const updatedStock = listaDeProductos.map((pizza) => {
      const pizzaEnCarrito = carro.find((item) => item.id === pizza.id);
      const stockDisponible = pizzaEnCarrito
        ? pizza.stock - pizzaEnCarrito.count
        : pizza.stock;

      return { ...pizza, stock: stockDisponible };
    });

    setStock(updatedStock);
  }, [carro, listaDeProductos]);


  useEffect(() => {
    const total = carro.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0);
    const newTotalCalculated = total - descuentoAplicado;
    setNewTotal(newTotalCalculated);
    setTotalisimo(pricer(newTotalCalculated));
  }, [carro, descuentoAplicado]);

  return (
    <CartContext.Provider
      value={{
        carro,
        stock,
        setStock,
        setCarro,
        totalisimo,
        setTotalisimo,
        listaDeProductos,
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

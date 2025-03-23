import { createContext, useState, useEffect } from "react";
import { pizzasJS } from "../data/pizzas";
import { pricer } from "../utilities/helper";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [listaDeProductos, setListaDeProductos] = useState(pizzasJS);
  const [cupon, setCupon] = useState("");
  const [stock, setStock] = useState([]);
  const [totalConDescuento, setTotalConDescuento] = useState(0);
  const [totalisimo, setTotalisimo] = useState(0);
  const [carro, setCarro] = useState([
    {
      id: "P002",
      name: "española",
      price: 7250,
      count: 3,
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab",
    },
  ]);
  const [promo, setPromo] = useState({
    aplicado: false,
    movistar: {
      clave: "movistar",
      minimo: 15000,
      porcentaje: 0.35,
      descuento: 12000,
    },
  });

  // Variables dinamicas para para el stock
  useEffect(() => {
    const stockActualizado = listaDeProductos.map((pizza) => {
      const pizzaEnCarrito = carro.find((item) => item.id === pizza.id); // busca en carro item.id y lo compara con el parametro.id
      const stockDisponible = pizzaEnCarrito // si la pizza buscada esta en el carro?
        ? pizza.stock - pizzaEnCarrito.count //devolvera el stock desde la lista y restara con la cantidad del carro, (actualiza el stock)
        : pizza.stock; // si no devuelve el stock de la lista. sin restar nada.
      return { id: pizza.id, stock: stockDisponible }; // retorna el id de pizzas de la lista y el stock Actual.
    });
    setStock(stockActualizado); //Array con todos los stocks disponibles
  }, [carro, listaDeProductos]);

  // cantidad total de pizzas del carrito
  let cantidad = carro.reduce((acc, pizza) => acc + pizza.count, 0);

  // valor total del carrito
  const total = carro.reduce(
    (acc, pizza) => acc + pizza.price * pizza.count,
    0
  );

  // actualización variables
  useEffect(() => {}, [cantidad, total]);

  //actualizador del total con descuento
  useEffect(() => {
    const nuevoTotal = total - totalConDescuento;
    setTotalisimo(pricer(nuevoTotal));
  }, [total, totalConDescuento, totalisimo, carro]);

  // funciones para el carrito
  function addPizza(id) {
    setCarro((prevPizzas) => {
      const pizzaEncontrada = listaDeProductos.find(
        (pizza) => pizza.id.toLowerCase() === id.toLowerCase()
      );
      if (!pizzaEncontrada) return prevPizzas;

      const pizzaExists = prevPizzas.find(
        (pizza) => pizza.id.toLowerCase() === pizzaEncontrada.id.toLowerCase()
      );

      if (pizzaExists) {
        return prevPizzas.map((pizza) =>
          pizza.id.toLowerCase() === pizzaEncontrada.id.toLowerCase()
            ? { ...pizza, count: pizza.count + 1 }
            : pizza
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

  //funcion para la variable descuento
  function calcularDescuento(total) {
    if (total < promo.movistar.minimo) return 0;
    return Math.floor(
      Math.min(total * promo.movistar.porcentaje, promo.movistar.descuento)
    );
  }

  //funcion para definir el total con descuento

  function aplicarCupon() {
    if (cupon.toLowerCase() === promo.movistar.clave) {
      const descuento = calcularDescuento(total);
      setTotalConDescuento(descuento);
      console.log("descuento aplicado");
    } else {
      setTotalConDescuento(0);
      console.log("Cupón inválido ❌");
    }
  }

  return (
    <CartContext.Provider
      value={{
        carro,
        totalisimo,
        cantidad,
        addPizza,
        deletePizza,
        cupon,
        promo,
        setCupon,
        setTotalisimo,
        stock,
        aplicarCupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

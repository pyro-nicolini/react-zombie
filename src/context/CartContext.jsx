import { createContext, useState, useEffect, useMemo } from "react";
import { pizzasJS } from "../data/pizzas";
import { pricer } from "../utilities/helper";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [listaDeProductos, setListaDeProductos] = useState(pizzasJS);
  const [cupon, setCupon] = useState("");
  const [stock, setStock] = useState([]);
  const [totalConDescuento, setTotalConDescuento] = useState(0);
  const [totalisimo, setTotalisimo] = useState(0);
  const [carro, setCarro] = useState([]);
  const [promo, setPromo] = useState({
    aplicado: false,
    movistar: {
      clave: "movistar",
      minimo: 15000,
      porcentaje: 0.35,
      descuento: 12000,
    },
  });

  const cantidad = useMemo(
    () => carro.reduce((acc, pizza) => acc + pizza.count, 0),
    [carro]
  );

  const total = useMemo(
    () => carro.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0),
    [carro]
  );

  // Corrige el problema del cupón manteniéndose activo incorrectamente
  useEffect(() => {
    if (promo.aplicado && total < promo.movistar.minimo) {
      setPromo((prevPromo) => ({ ...prevPromo, aplicado: false }));
      setTotalConDescuento(0);
      console.log("❌ Cupón removido: Total menor al mínimo requerido.");
    } else if (promo.aplicado) {
      setTotalConDescuento(calcularDescuento(total));
    }
  }, [carro, total, promo.aplicado]);

  // Actualiza el total final con o sin descuento
  useEffect(() => {
    const nuevoTotal = total - totalConDescuento;
    setTotalisimo(pricer(nuevoTotal));
  }, [total, totalConDescuento]);


  function addPizza(id) {
    setCarro((prevPizzas) => {
      const pizzaEncontrada = listaDeProductos.find(
        (pizza) => pizza.id.toLowerCase() === id.toLowerCase()
      );
      if (!pizzaEncontrada) return prevPizzas;

      return prevPizzas.some((pizza) => pizza.id.toLowerCase() === id.toLowerCase())
        ? prevPizzas.map((pizza) =>
            pizza.id.toLowerCase() === id.toLowerCase()
              ? { ...pizza, count: pizza.count + 1 }
              : pizza
          )
        : [...prevPizzas, { ...pizzaEncontrada, count: 1 }];
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

  function calcularDescuento(total) {
    if (total < promo.movistar.minimo) return 0;
    return Math.floor(
      Math.min(total * promo.movistar.porcentaje, promo.movistar.descuento)
    );
  }

  function aplicarCupon() {
    if (cupon.toLowerCase() === promo.movistar.clave && total >= promo.movistar.minimo) {
      setPromo((prevPromo) => ({ ...prevPromo, aplicado: true }));
      console.log("✅ Descuento aplicado");
    } else {
      setPromo((prevPromo) => ({ ...prevPromo, aplicado: false }));
      console.log("❌ Cupón inválido o monto insuficiente.");
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
